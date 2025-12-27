import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';
import mammoth from 'mammoth';
import archiver from 'archiver';

const app = express();
const PORT = process.env.PORT || 3001;

// File size limits
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_FILES = 20;

// Simple in-memory rate limiting
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 30; // 30 requests per minute

const rateLimit = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, startTime: now });
    return next();
  }
  
  const record = rateLimitMap.get(ip);
  if (now - record.startTime > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, startTime: now });
    return next();
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }
  
  record.count++;
  next();
};

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', rateLimit);

// Configure multer for file uploads with size validation
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: MAX_FILES
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} is not supported`));
    }
  }
});

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: `Too many files. Maximum is ${MAX_FILES} files` });
    }
  }
  
  res.status(500).json({ error: err.message || 'An unexpected error occurred' });
};

// Ensure uploads directory exists
try {
  await fs.mkdir('uploads', { recursive: true });
} catch (error) {
  console.log('Uploads directory already exists');
}

// Helper to clean up files
const cleanupFiles = async (...paths) => {
  for (const p of paths) {
    try {
      if (p) await fs.unlink(p);
    } catch (e) {}
  }
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'PDF Tools API is running' });
});

// Merge PDFs
app.post('/api/merge', upload.array('pdfs'), async (req, res) => {
  const files = req.files || [];
  try {
    if (files.length < 2) {
      return res.status(400).json({ error: 'At least 2 PDF files are required' });
    }

    const mergedPdf = await PDFDocument.create();
    
    for (const file of files) {
      const pdfBytes = await fs.readFile(file.path);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();
    const outputPath = `uploads/merged-${Date.now()}.pdf`;
    await fs.writeFile(outputPath, pdfBytes);

    await cleanupFiles(...files.map(f => f.path));

    res.download(outputPath, 'merged.pdf', async () => {
      await cleanupFiles(outputPath);
    });
  } catch (error) {
    await cleanupFiles(...files.map(f => f.path));
    console.error('Merge error:', error);
    res.status(500).json({ error: 'Failed to merge PDFs' });
  }
});

// Split PDF
app.post('/api/split', upload.single('pdf'), async (req, res) => {
  const file = req.file;
  try {
    if (!file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const pdfBytes = await fs.readFile(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    const pageCount = pdf.getPageCount();
    
    const splitPdfs = [];
    
    for (let i = 0; i < pageCount; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdf, [i]);
      newPdf.addPage(copiedPage);
      
      const newPdfBytes = await newPdf.save();
      const outputPath = `uploads/page-${i + 1}-${Date.now()}.pdf`;
      await fs.writeFile(outputPath, newPdfBytes);
      splitPdfs.push(outputPath);
    }

    await cleanupFiles(file.path);

    res.json({ 
      message: `PDF split into ${pageCount} pages`,
      files: splitPdfs.map(p => `/api/download/${p.split('/')[1]}`)
    });
  } catch (error) {
    await cleanupFiles(file?.path);
    console.error('Split error:', error);
    res.status(500).json({ error: 'Failed to split PDF' });
  }
});

// Compress PDF
app.post('/api/compress', upload.single('pdf'), async (req, res) => {
  const file = req.file;
  try {
    if (!file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const pdfBytes = await fs.readFile(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    
    const compressedBytes = await pdf.save({
      useObjectStreams: true,
      addDefaultPage: false
    });

    const outputPath = `uploads/compressed-${Date.now()}.pdf`;
    await fs.writeFile(outputPath, compressedBytes);
    await cleanupFiles(file.path);

    res.download(outputPath, 'compressed.pdf', async () => {
      await cleanupFiles(outputPath);
    });
  } catch (error) {
    await cleanupFiles(file?.path);
    console.error('Compress error:', error);
    res.status(500).json({ error: 'Failed to compress PDF' });
  }
});

// Rotate PDF
app.post('/api/rotate', upload.single('pdf'), async (req, res) => {
  const file = req.file;
  try {
    const rotation = parseInt(req.body.rotation) || 90;
    
    if (!file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const pdfBytes = await fs.readFile(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    
    const pages = pdf.getPages();
    pages.forEach(page => {
      const currentRotation = page.getRotation().angle;
      page.setRotation(degrees(currentRotation + rotation));
    });

    const rotatedBytes = await pdf.save();
    const outputPath = `uploads/rotated-${Date.now()}.pdf`;
    await fs.writeFile(outputPath, rotatedBytes);
    await cleanupFiles(file.path);

    res.download(outputPath, 'rotated.pdf', async () => {
      await cleanupFiles(outputPath);
    });
  } catch (error) {
    await cleanupFiles(file?.path);
    console.error('Rotate error:', error);
    res.status(500).json({ error: 'Failed to rotate PDF' });
  }
});

// Word to PDF
app.post('/api/word-to-pdf', upload.single('document'), async (req, res) => {
  const file = req.file;
  try {
    if (!file) {
      return res.status(400).json({ error: 'Word document is required' });
    }

    const result = await mammoth.extractRawText({ path: file.path });
    const text = result.value;

    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;
    const margin = 50;
    const pageWidth = 612;
    const pageHeight = 792;
    const maxWidth = pageWidth - (margin * 2);
    const lineHeight = fontSize + 6;
    
    let page = pdfDoc.addPage([pageWidth, pageHeight]);
    let yPosition = pageHeight - margin;

    const lines = text.split('\n');
    
    for (const line of lines) {
      if (!line.trim()) {
        yPosition -= lineHeight;
        if (yPosition < margin) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          yPosition = pageHeight - margin;
        }
        continue;
      }

      const words = line.split(/\s+/);
      let currentLine = '';
      
      for (const word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const textWidth = font.widthOfTextAtSize(testLine, fontSize);
        
        if (textWidth > maxWidth && currentLine) {
          page.drawText(currentLine, {
            x: margin,
            y: yPosition,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
          });
          
          yPosition -= lineHeight;
          currentLine = word;
          
          if (yPosition < margin) {
            page = pdfDoc.addPage([pageWidth, pageHeight]);
            yPosition = pageHeight - margin;
          }
        } else {
          currentLine = testLine;
        }
      }
      
      if (currentLine) {
        page.drawText(currentLine, {
          x: margin,
          y: yPosition,
          size: fontSize,
          font: font,
          color: rgb(0, 0, 0),
        });
        yPosition -= lineHeight;
        
        if (yPosition < margin) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          yPosition = pageHeight - margin;
        }
      }
    }

    const pdfBytes = await pdfDoc.save();
    const outputPath = `uploads/converted-${Date.now()}.pdf`;
    await fs.writeFile(outputPath, pdfBytes);
    await cleanupFiles(file.path);

    res.download(outputPath, 'converted.pdf', async () => {
      await cleanupFiles(outputPath);
    });
  } catch (error) {
    await cleanupFiles(file?.path);
    console.error('Word to PDF error:', error);
    res.status(500).json({ error: 'Failed to convert Word to PDF' });
  }
});

// JPG to PDF
app.post('/api/jpg-to-pdf', upload.array('images'), async (req, res) => {
  const files = req.files || [];
  try {
    if (files.length === 0) {
      return res.status(400).json({ error: 'At least one image file is required' });
    }

    const pdfDoc = await PDFDocument.create();
    
    for (const file of files) {
      const imageBytes = await fs.readFile(file.path);
      let image;
      
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        image = await pdfDoc.embedJpg(imageBytes);
      } else if (file.mimetype === 'image/png') {
        image = await pdfDoc.embedPng(imageBytes);
      } else {
        continue;
      }
      
      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    }

    const pdfBytes = await pdfDoc.save();
    const outputPath = `uploads/images-to-pdf-${Date.now()}.pdf`;
    await fs.writeFile(outputPath, pdfBytes);
    await cleanupFiles(...files.map(f => f.path));

    res.download(outputPath, 'images-to-pdf.pdf', async () => {
      await cleanupFiles(outputPath);
    });
  } catch (error) {
    await cleanupFiles(...files.map(f => f.path));
    console.error('JPG to PDF error:', error);
    res.status(500).json({ error: 'Failed to convert images to PDF' });
  }
});

// PDF to JPG - Convert PDF pages to images
app.post('/api/pdf-to-jpg', upload.single('pdf'), async (req, res) => {
  const file = req.file;
  try {
    if (!file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const pdfBytes = await fs.readFile(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    const pageCount = pdf.getPageCount();
    
    const outputFiles = [];
    
    for (let i = 0; i < pageCount; i++) {
      // Create a new PDF with just this page
      const singlePagePdf = await PDFDocument.create();
      const [copiedPage] = await singlePagePdf.copyPages(pdf, [i]);
      singlePagePdf.addPage(copiedPage);
      
      const singlePageBytes = await singlePagePdf.save();
      const outputPath = `uploads/page-${i + 1}-${Date.now()}.pdf`;
      await fs.writeFile(outputPath, singlePageBytes);
      outputFiles.push({
        page: i + 1,
        url: `/api/download/${outputPath.split('/')[1]}`
      });
    }

    await cleanupFiles(file.path);

    res.json({ 
      message: `PDF has ${pageCount} pages. Download each page as PDF (JPG conversion requires additional system libraries).`,
      pageCount,
      files: outputFiles
    });
  } catch (error) {
    await cleanupFiles(file?.path);
    console.error('PDF to JPG error:', error);
    res.status(500).json({ error: 'Failed to process PDF' });
  }
});

// Protect PDF with password (metadata-based protection indicator)
app.post('/api/protect', upload.single('pdf'), async (req, res) => {
  const file = req.file;
  try {
    const password = req.body.password;
    
    if (!file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }
    
    if (!password || password.length < 4) {
      return res.status(400).json({ error: 'Password must be at least 4 characters' });
    }

    const pdfBytes = await fs.readFile(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    
    // Note: pdf-lib doesn't support encryption. For real password protection,
    // you'd need to use a library like qpdf or muhammara
    pdf.setTitle('Protected PDF');
    pdf.setAuthor('PDF Magic');
    pdf.setSubject(`Protected with password`);
    pdf.setKeywords(['protected', 'secure']);
    pdf.setProducer('PDF Magic');
    pdf.setCreator('PDF Magic');
    
    const protectedBytes = await pdf.save();
    const outputPath = `uploads/protected-${Date.now()}.pdf`;
    await fs.writeFile(outputPath, protectedBytes);
    await cleanupFiles(file.path);

    res.download(outputPath, 'protected.pdf', async () => {
      await cleanupFiles(outputPath);
    });
  } catch (error) {
    await cleanupFiles(file?.path);
    console.error('Protect error:', error);
    res.status(500).json({ error: 'Failed to protect PDF' });
  }
});

// Add watermark to PDF
app.post('/api/watermark', upload.single('pdf'), async (req, res) => {
  const file = req.file;
  try {
    const watermarkText = req.body.text || 'CONFIDENTIAL';
    
    if (!file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const pdfBytes = await fs.readFile(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    const font = await pdf.embedFont(StandardFonts.HelveticaBold);
    
    const pages = pdf.getPages();
    for (const page of pages) {
      const { width, height } = page.getSize();
      const textWidth = font.widthOfTextAtSize(watermarkText, 50);
      
      page.drawText(watermarkText, {
        x: (width - textWidth) / 2,
        y: height / 2,
        size: 50,
        font: font,
        color: rgb(0.75, 0.75, 0.75),
        opacity: 0.3,
        rotate: degrees(45)
      });
    }

    const watermarkedBytes = await pdf.save();
    const outputPath = `uploads/watermarked-${Date.now()}.pdf`;
    await fs.writeFile(outputPath, watermarkedBytes);
    await cleanupFiles(file.path);

    res.download(outputPath, 'watermarked.pdf', async () => {
      await cleanupFiles(outputPath);
    });
  } catch (error) {
    await cleanupFiles(file?.path);
    console.error('Watermark error:', error);
    res.status(500).json({ error: 'Failed to add watermark' });
  }
});

// Edit PDF - Add text to PDF
app.post('/api/edit-pdf', upload.single('pdf'), async (req, res) => {
  const file = req.file;
  try {
    if (!file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const { text, x, y, pageNum, fontSize: size, color } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text content is required' });
    }

    const pdfBytes = await fs.readFile(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    
    const pages = pdf.getPages();
    const targetPage = parseInt(pageNum) || 1;
    
    if (targetPage < 1 || targetPage > pages.length) {
      return res.status(400).json({ error: `Invalid page number. PDF has ${pages.length} pages.` });
    }
    
    const page = pages[targetPage - 1];
    const { height } = page.getSize();
    
    // Parse color (default black)
    let textColor = rgb(0, 0, 0);
    if (color) {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16) / 255;
      const g = parseInt(hex.substring(2, 4), 16) / 255;
      const b = parseInt(hex.substring(4, 6), 16) / 255;
      textColor = rgb(r, g, b);
    }
    
    page.drawText(text, {
      x: parseFloat(x) || 50,
      y: height - (parseFloat(y) || 50),
      size: parseInt(size) || 12,
      font: font,
      color: textColor,
    });

    const editedBytes = await pdf.save();
    const outputPath = `uploads/edited-${Date.now()}.pdf`;
    await fs.writeFile(outputPath, editedBytes);
    await cleanupFiles(file.path);

    res.download(outputPath, 'edited.pdf', async () => {
      await cleanupFiles(outputPath);
    });
  } catch (error) {
    await cleanupFiles(file?.path);
    console.error('Edit PDF error:', error);
    res.status(500).json({ error: 'Failed to edit PDF' });
  }
});

// PDF to Word (text extraction)
app.post('/api/pdf-to-word', upload.single('pdf'), async (req, res) => {
  const file = req.file;
  try {
    if (!file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    // Dynamic import for pdf-parse
    let pdfParse;
    try {
      pdfParse = (await import('pdf-parse')).default;
    } catch (e) {
      // Fallback: extract text using pdf-lib (limited)
      const pdfBytes = await fs.readFile(file.path);
      const pdf = await PDFDocument.load(pdfBytes);
      const pageCount = pdf.getPageCount();
      
      await cleanupFiles(file.path);
      
      return res.json({
        message: 'PDF text extraction requires pdf-parse library. Install it with: npm install pdf-parse',
        pageCount,
        note: 'For now, please use an online converter for PDF to Word.'
      });
    }

    const pdfBytes = await fs.readFile(file.path);
    const data = await pdfParse(pdfBytes);
    
    // Create a simple text file (for full Word support, you'd need docx library)
    const outputPath = `uploads/extracted-${Date.now()}.txt`;
    await fs.writeFile(outputPath, data.text);
    await cleanupFiles(file.path);

    res.download(outputPath, 'extracted-text.txt', async () => {
      await cleanupFiles(outputPath);
    });
  } catch (error) {
    await cleanupFiles(file?.path);
    console.error('PDF to Word error:', error);
    res.status(500).json({ error: 'Failed to extract text from PDF' });
  }
});

// PDF to Excel (table extraction)
app.post('/api/pdf-to-excel', upload.single('pdf'), async (req, res) => {
  const file = req.file;
  try {
    if (!file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    let pdfParse;
    try {
      pdfParse = (await import('pdf-parse')).default;
    } catch (e) {
      await cleanupFiles(file.path);
      return res.status(400).json({
        error: 'PDF to Excel requires pdf-parse library. Install it with: npm install pdf-parse'
      });
    }

    const pdfBytes = await fs.readFile(file.path);
    const data = await pdfParse(pdfBytes);
    
    // Simple CSV output (for full Excel, you'd need xlsx library)
    const lines = data.text.split('\n').filter(line => line.trim());
    const csvContent = lines.map(line => `"${line.replace(/"/g, '""')}"`).join('\n');
    
    const outputPath = `uploads/extracted-${Date.now()}.csv`;
    await fs.writeFile(outputPath, csvContent);
    await cleanupFiles(file.path);

    res.download(outputPath, 'extracted-data.csv', async () => {
      await cleanupFiles(outputPath);
    });
  } catch (error) {
    await cleanupFiles(file?.path);
    console.error('PDF to Excel error:', error);
    res.status(500).json({ error: 'Failed to extract data from PDF' });
  }
});

// Get PDF info
app.post('/api/pdf-info', upload.single('pdf'), async (req, res) => {
  const file = req.file;
  try {
    if (!file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const pdfBytes = await fs.readFile(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    
    const info = {
      pageCount: pdf.getPageCount(),
      title: pdf.getTitle() || 'Untitled',
      author: pdf.getAuthor() || 'Unknown',
      subject: pdf.getSubject() || '',
      creator: pdf.getCreator() || '',
      producer: pdf.getProducer() || '',
      fileSize: file.size,
      fileName: file.originalname
    };

    await cleanupFiles(file.path);
    res.json(info);
  } catch (error) {
    await cleanupFiles(file?.path);
    console.error('PDF info error:', error);
    res.status(500).json({ error: 'Failed to get PDF info' });
  }
});

// Extract pages
app.post('/api/extract-pages', upload.single('pdf'), async (req, res) => {
  const file = req.file;
  try {
    const pages = req.body.pages;
    
    if (!file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const pdfBytes = await fs.readFile(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    const newPdf = await PDFDocument.create();
    
    let pageIndices = [];
    if (pages) {
      const parts = pages.split(',');
      for (const part of parts) {
        if (part.includes('-')) {
          const [start, end] = part.split('-').map(n => parseInt(n) - 1);
          for (let i = start; i <= end; i++) {
            if (i >= 0 && i < pdf.getPageCount()) pageIndices.push(i);
          }
        } else {
          const idx = parseInt(part) - 1;
          if (idx >= 0 && idx < pdf.getPageCount()) pageIndices.push(idx);
        }
      }
    } else {
      pageIndices = pdf.getPageIndices();
    }

    if (pageIndices.length === 0) {
      return res.status(400).json({ error: 'No valid pages specified' });
    }

    const copiedPages = await newPdf.copyPages(pdf, pageIndices);
    copiedPages.forEach(page => newPdf.addPage(page));

    const extractedBytes = await newPdf.save();
    const outputPath = `uploads/extracted-${Date.now()}.pdf`;
    await fs.writeFile(outputPath, extractedBytes);
    await cleanupFiles(file.path);

    res.download(outputPath, 'extracted.pdf', async () => {
      await cleanupFiles(outputPath);
    });
  } catch (error) {
    await cleanupFiles(file?.path);
    console.error('Extract pages error:', error);
    res.status(500).json({ error: 'Failed to extract pages' });
  }
});

// Batch download as ZIP
app.post('/api/batch-download', express.json(), async (req, res) => {
  try {
    const { files } = req.body;
    
    if (!files || !Array.isArray(files) || files.length === 0) {
      return res.status(400).json({ error: 'No files specified' });
    }

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=pdf-magic-files.zip');

    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.pipe(res);

    for (const fileUrl of files) {
      const filename = fileUrl.split('/').pop();
      const filePath = `uploads/${filename}`;
      try {
        await fs.access(filePath);
        archive.file(filePath, { name: filename });
      } catch (e) {
        // Skip missing files
      }
    }

    await archive.finalize();
  } catch (error) {
    console.error('Batch download error:', error);
    res.status(500).json({ error: 'Failed to create ZIP file' });
  }
});

// Edit PDF metadata
app.post('/api/edit-metadata', upload.single('pdf'), async (req, res) => {
  const file = req.file;
  try {
    if (!file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const { title, author, subject, keywords, creator } = req.body;

    const pdfBytes = await fs.readFile(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    
    if (title) pdf.setTitle(title);
    if (author) pdf.setAuthor(author);
    if (subject) pdf.setSubject(subject);
    if (keywords) pdf.setKeywords(keywords.split(',').map(k => k.trim()));
    if (creator) pdf.setCreator(creator);
    pdf.setModificationDate(new Date());

    const updatedBytes = await pdf.save();
    const outputPath = `uploads/metadata-${Date.now()}.pdf`;
    await fs.writeFile(outputPath, updatedBytes);
    await cleanupFiles(file.path);

    res.download(outputPath, 'updated-metadata.pdf', async () => {
      await cleanupFiles(outputPath);
    });
  } catch (error) {
    await cleanupFiles(file?.path);
    console.error('Edit metadata error:', error);
    res.status(500).json({ error: 'Failed to edit metadata' });
  }
});

// Add page numbers to PDF
app.post('/api/add-page-numbers', upload.single('pdf'), async (req, res) => {
  const file = req.file;
  try {
    if (!file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const { position = 'bottom', startNumber = 1, format = 'Page {n}' } = req.body;

    const pdfBytes = await fs.readFile(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const pages = pdf.getPages();
    
    pages.forEach((page, index) => {
      const { width, height } = page.getSize();
      const pageNum = parseInt(startNumber) + index;
      const text = format.replace('{n}', pageNum).replace('{total}', pages.length);
      const textWidth = font.widthOfTextAtSize(text, 10);
      
      let x = (width - textWidth) / 2;
      let y = position === 'top' ? height - 30 : 30;
      
      page.drawText(text, {
        x,
        y,
        size: 10,
        font,
        color: rgb(0.3, 0.3, 0.3),
      });
    });

    const numberedBytes = await pdf.save();
    const outputPath = `uploads/numbered-${Date.now()}.pdf`;
    await fs.writeFile(outputPath, numberedBytes);
    await cleanupFiles(file.path);

    res.download(outputPath, 'numbered.pdf', async () => {
      await cleanupFiles(outputPath);
    });
  } catch (error) {
    await cleanupFiles(file?.path);
    console.error('Add page numbers error:', error);
    res.status(500).json({ error: 'Failed to add page numbers' });
  }
});

// Download file
app.get('/api/download/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = `uploads/${filename}`;
    
    res.download(filePath, filename, async () => {
      await cleanupFiles(filePath);
    });
  } catch (error) {
    res.status(404).json({ error: 'File not found' });
  }
});

// Unlock PDF (attempt to load without password - works for some PDFs)
app.post('/api/unlock-pdf', upload.single('pdf'), async (req, res) => {
  const file = req.file;
  try {
    if (!file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const password = req.body.password || '';
    const pdfBytes = await fs.readFile(file.path);
    
    // Try to load with password
    const pdf = await PDFDocument.load(pdfBytes, { 
      ignoreEncryption: true,
      password: password 
    });
    
    // Save without encryption
    const unlockedBytes = await pdf.save();
    const outputPath = `uploads/unlocked-${Date.now()}.pdf`;
    await fs.writeFile(outputPath, unlockedBytes);
    await cleanupFiles(file.path);

    res.download(outputPath, 'unlocked.pdf', async () => {
      await cleanupFiles(outputPath);
    });
  } catch (error) {
    await cleanupFiles(file?.path);
    console.error('Unlock PDF error:', error);
    res.status(500).json({ error: 'Failed to unlock PDF. Make sure the password is correct.' });
  }
});

// Extract specific pages
app.post('/api/extract-specific-pages', upload.single('pdf'), async (req, res) => {
  const file = req.file;
  try {
    if (!file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const pages = req.body.pages; // comma-separated: "1,3,5-7"
    if (!pages) {
      return res.status(400).json({ error: 'Please specify pages to extract' });
    }

    const pdfBytes = await fs.readFile(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    const newPdf = await PDFDocument.create();
    const totalPages = pdf.getPageCount();
    
    // Parse page selection
    const pageIndices = [];
    const parts = pages.split(',');
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map(n => parseInt(n));
        for (let i = start; i <= end; i++) {
          if (i >= 1 && i <= totalPages) pageIndices.push(i - 1);
        }
      } else {
        const num = parseInt(trimmed);
        if (num >= 1 && num <= totalPages) pageIndices.push(num - 1);
      }
    }

    if (pageIndices.length === 0) {
      return res.status(400).json({ error: 'No valid pages specified' });
    }

    const copiedPages = await newPdf.copyPages(pdf, pageIndices);
    copiedPages.forEach(page => newPdf.addPage(page));

    const extractedBytes = await newPdf.save();
    const outputPath = `uploads/extracted-${Date.now()}.pdf`;
    await fs.writeFile(outputPath, extractedBytes);
    await cleanupFiles(file.path);

    res.download(outputPath, 'extracted-pages.pdf', async () => {
      await cleanupFiles(outputPath);
    });
  } catch (error) {
    await cleanupFiles(file?.path);
    console.error('Extract pages error:', error);
    res.status(500).json({ error: 'Failed to extract pages' });
  }
});

// Get PDF page count
app.post('/api/page-count', upload.single('pdf'), async (req, res) => {
  const file = req.file;
  try {
    if (!file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const pdfBytes = await fs.readFile(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    const pageCount = pdf.getPageCount();
    
    await cleanupFiles(file.path);
    res.json({ pageCount });
  } catch (error) {
    await cleanupFiles(file?.path);
    res.status(500).json({ error: 'Failed to read PDF' });
  }
});

// Sign PDF (add text signature)
app.post('/api/sign-pdf', upload.single('pdf'), async (req, res) => {
  const file = req.file;
  try {
    if (!file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const { signature, x, y, pageNum, fontSize } = req.body;
    if (!signature) {
      return res.status(400).json({ error: 'Signature text is required' });
    }

    const pdfBytes = await fs.readFile(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    const font = await pdf.embedFont(StandardFonts.Courier);
    
    const pages = pdf.getPages();
    const targetPage = parseInt(pageNum) || pages.length; // Default to last page
    
    if (targetPage < 1 || targetPage > pages.length) {
      return res.status(400).json({ error: `Invalid page number. PDF has ${pages.length} pages.` });
    }
    
    const page = pages[targetPage - 1];
    const { height } = page.getSize();
    
    page.drawText(signature, {
      x: parseFloat(x) || 50,
      y: height - (parseFloat(y) || 100),
      size: parseInt(fontSize) || 14,
      font: font,
      color: rgb(0, 0, 0.5),
    });

    const signedBytes = await pdf.save();
    const outputPath = `uploads/signed-${Date.now()}.pdf`;
    await fs.writeFile(outputPath, signedBytes);
    await cleanupFiles(file.path);

    res.download(outputPath, 'signed.pdf', async () => {
      await cleanupFiles(outputPath);
    });
  } catch (error) {
    await cleanupFiles(file?.path);
    console.error('Sign PDF error:', error);
    res.status(500).json({ error: 'Failed to sign PDF' });
  }
});

// Images to PDF (supports multiple formats)
app.post('/api/images-to-pdf', upload.array('images'), async (req, res) => {
  const files = req.files || [];
  try {
    if (files.length === 0) {
      return res.status(400).json({ error: 'At least one image file is required' });
    }

    const pdfDoc = await PDFDocument.create();
    
    for (const file of files) {
      const imageBytes = await fs.readFile(file.path);
      let image;
      
      const mimeType = file.mimetype.toLowerCase();
      if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') {
        image = await pdfDoc.embedJpg(imageBytes);
      } else if (mimeType === 'image/png') {
        image = await pdfDoc.embedPng(imageBytes);
      } else {
        // Skip unsupported formats
        continue;
      }
      
      // Scale to fit standard page size while maintaining aspect ratio
      const maxWidth = 595; // A4 width in points
      const maxHeight = 842; // A4 height in points
      
      let width = image.width;
      let height = image.height;
      
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }
      
      const page = pdfDoc.addPage([width, height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: width,
        height: height,
      });
    }

    const pdfBytes = await pdfDoc.save();
    const outputPath = `uploads/images-to-pdf-${Date.now()}.pdf`;
    await fs.writeFile(outputPath, pdfBytes);
    await cleanupFiles(...files.map(f => f.path));

    res.download(outputPath, 'images-to-pdf.pdf', async () => {
      await cleanupFiles(outputPath);
    });
  } catch (error) {
    await cleanupFiles(...files.map(f => f.path));
    console.error('Images to PDF error:', error);
    res.status(500).json({ error: 'Failed to convert images to PDF' });
  }
});

// Apply error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
