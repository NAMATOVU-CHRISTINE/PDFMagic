import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';
import mammoth from 'mammoth';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Flexible upload - accept multiple file types
const upload = multer({ 
  storage,
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

// Ensure uploads directory exists
try {
  await fs.mkdir('uploads', { recursive: true });
} catch (error) {
  console.log('Uploads directory already exists');
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'PDF Tools API is running' });
});

// Merge PDFs
app.post('/api/merge', upload.array('pdfs'), async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length < 2) {
      return res.status(400).json({ error: 'At least 2 PDF files are required' });
    }

    const mergedPdf = await PDFDocument.create();
    
    for (const file of files) {
      const pdfBytes = await fs.readFile(file.path);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
      
      // Clean up uploaded file
      await fs.unlink(file.path);
    }

    const pdfBytes = await mergedPdf.save();
    const outputPath = `uploads/merged-${Date.now()}.pdf`;
    await fs.writeFile(outputPath, pdfBytes);

    res.download(outputPath, 'merged.pdf', async () => {
      // Clean up output file after download
      await fs.unlink(outputPath);
    });
  } catch (error) {
    console.error('Merge error:', error);
    res.status(500).json({ error: 'Failed to merge PDFs' });
  }
});

// Split PDF
app.post('/api/split', upload.single('pdf'), async (req, res) => {
  try {
    const file = req.file;
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

    // Clean up uploaded file
    await fs.unlink(file.path);

    res.json({ 
      message: `PDF split into ${pageCount} pages`,
      files: splitPdfs.map(path => `/api/download/${path.split('/')[1]}`)
    });
  } catch (error) {
    console.error('Split error:', error);
    res.status(500).json({ error: 'Failed to split PDF' });
  }
});

// Compress PDF (basic implementation)
app.post('/api/compress', upload.single('pdf'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const pdfBytes = await fs.readFile(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    
    // Basic compression by re-saving the PDF
    const compressedBytes = await pdf.save({
      useObjectStreams: false,
      addDefaultPage: false
    });

    const outputPath = `uploads/compressed-${Date.now()}.pdf`;
    await fs.writeFile(outputPath, compressedBytes);

    // Clean up uploaded file
    await fs.unlink(file.path);

    res.download(outputPath, 'compressed.pdf', async () => {
      // Clean up output file after download
      await fs.unlink(outputPath);
    });
  } catch (error) {
    console.error('Compress error:', error);
    res.status(500).json({ error: 'Failed to compress PDF' });
  }
});

// Rotate PDF
app.post('/api/rotate', upload.single('pdf'), async (req, res) => {
  try {
    const file = req.file;
    const rotation = parseInt(req.body.rotation) || 90;
    
    if (!file) {
      return res.status(400).json({ error: 'PDF file is required' });
    }

    const pdfBytes = await fs.readFile(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    
    const pages = pdf.getPages();
    pages.forEach(page => {
      page.setRotation({ angle: rotation });
    });

    const rotatedBytes = await pdf.save();
    const outputPath = `uploads/rotated-${Date.now()}.pdf`;
    await fs.writeFile(outputPath, rotatedBytes);

    // Clean up uploaded file
    await fs.unlink(file.path);

    res.download(outputPath, 'rotated.pdf', async () => {
      // Clean up output file after download
      await fs.unlink(outputPath);
    });
  } catch (error) {
    console.error('Rotate error:', error);
    res.status(500).json({ error: 'Failed to rotate PDF' });
  }
});

// Word to PDF conversion with mammoth
app.post('/api/word-to-pdf', upload.single('document'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'Word document is required' });
    }

    // Extract text from Word document using mammoth
    const result = await mammoth.extractRawText({ path: file.path });
    const text = result.value;

    // Create PDF with extracted text
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;
    const margin = 50;
    const pageWidth = 612;
    const pageHeight = 792;
    const maxWidth = pageWidth - (margin * 2);
    
    let page = pdfDoc.addPage([pageWidth, pageHeight]);
    let yPosition = pageHeight - margin;

    // Split text into lines that fit the page width
    const words = text.split(/\s+/);
    let currentLine = '';
    
    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const textWidth = font.widthOfTextAtSize(testLine, fontSize);
      
      if (textWidth > maxWidth && currentLine) {
        // Draw current line
        page.drawText(currentLine, {
          x: margin,
          y: yPosition,
          size: fontSize,
          font: font,
          color: rgb(0, 0, 0),
        });
        
        yPosition -= fontSize + 4;
        currentLine = word;
        
        // Check if we need a new page
        if (yPosition < margin) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          yPosition = pageHeight - margin;
        }
      } else {
        currentLine = testLine;
      }
    }
    
    // Draw remaining text
    if (currentLine) {
      page.drawText(currentLine, {
        x: margin,
        y: yPosition,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
    }

    const pdfBytes = await pdfDoc.save();
    const outputPath = `uploads/converted-${Date.now()}.pdf`;
    await fs.writeFile(outputPath, pdfBytes);

    // Clean up uploaded file
    await fs.unlink(file.path);

    res.download(outputPath, 'converted.pdf', async () => {
      // Clean up output file after download
      await fs.unlink(outputPath);
    });
  } catch (error) {
    console.error('Word to PDF error:', error);
    res.status(500).json({ error: 'Failed to convert Word to PDF' });
  }
});

// JPG to PDF conversion
app.post('/api/jpg-to-pdf', upload.array('images'), async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'At least one image file is required' });
    }

    const pdfDoc = await PDFDocument.create();
    
    for (const file of files) {
      const imageBytes = await fs.readFile(file.path);
      let image;
      
      if (file.mimetype === 'image/jpeg') {
        image = await pdfDoc.embedJpg(imageBytes);
      } else if (file.mimetype === 'image/png') {
        image = await pdfDoc.embedPng(imageBytes);
      } else {
        continue; // Skip unsupported formats
      }
      
      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
      
      // Clean up uploaded file
      await fs.unlink(file.path);
    }

    const pdfBytes = await pdfDoc.save();
    const outputPath = `uploads/images-to-pdf-${Date.now()}.pdf`;
    await fs.writeFile(outputPath, pdfBytes);

    res.download(outputPath, 'images-to-pdf.pdf', async () => {
      // Clean up output file after download
      await fs.unlink(outputPath);
    });
  } catch (error) {
    console.error('JPG to PDF error:', error);
    res.status(500).json({ error: 'Failed to convert images to PDF' });
  }
});

// Download split files
app.get('/api/download/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = `uploads/${filename}`;
    
    res.download(filePath, filename, async () => {
      // Clean up file after download
      await fs.unlink(filePath);
    });
  } catch (error) {
    res.status(404).json({ error: 'File not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});