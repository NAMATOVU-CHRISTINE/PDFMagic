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
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <span className="text-2xl font-bold">I</span>
                <span className="text-2xl text-red-500">❤️</span>
                <span className="text-2xl font-bold">PDF</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-gray-900 font-medium">Login</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedTool ? (
          <>
            {/* Personalized Greeting */}
            <div className="text-center mb-8 animate-fadeInUp">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Hi Christine Namatovu, let's get started
              </h2>
              
              {/* Category Tabs */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <button className="px-6 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
                  All
                </button>
                <button className="px-6 py-2 bg-white text-gray-700 rounded-full font-medium hover:bg-gray-100 transition-colors border border-gray-200">
                  Workflows
                </button>
                <button className="px-6 py-2 bg-white text-gray-700 rounded-full font-medium hover:bg-gray-100 transition-colors border border-gray-200">
                  Organize PDF
                </button>
                <button className="px-6 py-2 bg-white text-gray-700 rounded-full font-medium hover:bg-gray-100 transition-colors border border-gray-200">
                  Optimize PDF
                </button>
                <button className="px-6 py-2 bg-white text-gray-700 rounded-full font-medium hover:bg-gray-100 transition-colors border border-gray-200">
                  Convert PDF
                </button>
                <button className="px-6 py-2 bg-white text-gray-700 rounded-full font-medium hover:bg-gray-100 transition-colors border border-gray-200">
                  Edit PDF
                </button>
                <button className="px-6 py-2 bg-white text-gray-700 rounded-full font-medium hover:bg-gray-100 transition-colors border border-gray-200">
                  PDF Security
                </button>
              </div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tools.map((tool, index) => (
                <div 
                  key={tool.id}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div 
                    onClick={() => setSelectedTool(tool.id)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer p-6 border border-gray-100"
                  >
                    <div className={`w-16 h-16 ${tool.color} rounded-lg flex items-center justify-center mb-4`}>
                      <tool.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{tool.description}</p>
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
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">&copy; {new Date().getFullYear()} PDF Tools. Free online PDF editor.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;