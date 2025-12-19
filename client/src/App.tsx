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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">PDF Tools</h1>
            </div>
            <p className="text-sm text-gray-600 font-medium">Free Online PDF Editor</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedTool ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12 animate-fadeInUp">
              <h2 className="text-5xl font-bold text-gray-900 mb-4">
                Every tool you need to work with{' '}
                <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  PDFs
                </span>{' '}
                in one place
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Free and easy to use online PDF tools to merge, split, compress, and convert PDF files.
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tools.map((tool, index) => (
                <div 
                  key={tool.id}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div 
                    onClick={() => setSelectedTool(tool.id)}
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer p-6 border border-white/20"
                  >
                    <div className={`w-14 h-14 ${tool.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                      <tool.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
                    <p className="text-gray-600 text-sm">{tool.description}</p>
                  </div>
                </div>
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
      <footer className="bg-white/80 backdrop-blur-md border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="font-medium">&copy; {new Date().getFullYear()} PDF Tools. Free online PDF editor.</p>
            <p className="text-sm mt-2">Made with ❤️ by NAMATOVU-CHRISTINE</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;