import { useState } from 'react';
import { FileText, Merge, Split, Minimize2, RotateCw, Lock, FileImage, FileDown } from 'lucide-react';
import FileUpload from './components/FileUpload.tsx';
import ToolCard from './components/ToolCard.tsx';

function App() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const tools = [
    {
      id: 'merge',
      title: 'Merge PDF',
      description: 'Combine multiple PDF files into one',
      icon: Merge,
      color: 'bg-blue-500'
    },
    {
      id: 'split',
      title: 'Split PDF',
      description: 'Extract pages from your PDF',
      icon: Split,
      color: 'bg-green-500'
    },
    {
      id: 'compress',
      title: 'Compress PDF',
      description: 'Reduce file size while optimizing for maximal PDF quality',
      icon: Minimize2,
      color: 'bg-purple-500'
    },
    {
      id: 'rotate',
      title: 'Rotate PDF',
      description: 'Rotate your PDF pages to the right orientation',
      icon: RotateCw,
      color: 'bg-orange-500'
    },
    {
      id: 'protect',
      title: 'Protect PDF',
      description: 'Protect your PDF with a password',
      icon: Lock,
      color: 'bg-red-500'
    },
    {
      id: 'pdf-to-jpg',
      title: 'PDF to JPG',
      description: 'Convert each PDF page into a JPG image',
      icon: FileImage,
      color: 'bg-indigo-500'
    },
    {
      id: 'jpg-to-pdf',
      title: 'JPG to PDF',
      description: 'Convert JPG images to PDF format',
      icon: FileDown,
      color: 'bg-teal-500'
    },
    {
      id: 'word-to-pdf',
      title: 'Word to PDF',
      description: 'Convert Word documents to PDF format',
      icon: FileText,
      color: 'bg-cyan-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-red-500" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">PDF Tools</h1>
            </div>
            <p className="text-sm text-gray-500">Free Online PDF Editor</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedTool ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Every tool you need to work with PDFs in one place
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Free and easy to use online PDF tools to merge, split, compress, and convert PDF files.
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onClick={() => setSelectedTool(tool.id)}
                />
              ))}
            </div>
          </>
        ) : (
          <div>
            <button
              onClick={() => setSelectedTool(null)}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
            >
              ← Back to tools
            </button>
            <FileUpload 
              toolType={selectedTool}
              onBack={() => setSelectedTool(null)}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} PDF Tools. Free online PDF editor.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;