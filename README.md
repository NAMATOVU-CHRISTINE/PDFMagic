# PDF Tools - Free Online PDF Editor

A modern web application for PDF manipulation, similar to iLovePDF. Built with React, TypeScript, and Node.js.

## Features

- **Merge PDFs**: Combine multiple PDF files into one document
- **Split PDFs**: Extract individual pages from PDF files
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **File Upload**: Drag and drop or click to upload PDF files
- **Real-time Processing**: Fast server-side PDF manipulation

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- React Dropzone for file uploads
- Lucide React for icons

### Backend
- Node.js with Express
- PDF-lib for PDF manipulation
- Multer for file uploads
- CORS enabled for cross-origin requests

## Quick Start

1. **Install dependencies for all packages:**
   ```bash
   npm run install:all
   ```

2. **Start the development servers:**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend on http://localhost:3000
   - Backend API on http://localhost:3001

## Manual Setup

If you prefer to set up each part individually:

### Backend Setup
```bash
cd server
npm install
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/merge` - Merge multiple PDF files
- `POST /api/split` - Split PDF into individual pages
- `GET /api/download/:filename` - Download processed files

## Project Structure

```
pdf-tools/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
│   ├── package.json
│   └── vite.config.ts
├── server/                 # Node.js backend
│   ├── src/
│   │   └── index.js       # Express server
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## Usage

1. Open http://localhost:3000 in your browser
2. Select a tool (Merge or Split)
3. Upload your PDF files using drag & drop or file picker
4. Click the process button
5. Download your processed files

## Development

- Frontend runs on port 3000 with hot reload
- Backend runs on port 3001 with nodemon
- API requests are proxied from frontend to backend
- Uploaded files are temporarily stored in `server/uploads/`

## Production Build

```bash
cd client
npm run build
```

The built files will be in `client/dist/` ready for deployment.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.