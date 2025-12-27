import { useState, useEffect } from 'react';
import {
  FileText,
  Merge,
  Split,
  Minimize2,
  RotateCw,
  Lock,
  FileImage,
  FileDown,
  Moon,
  Sun,
  Edit,
  FileSpreadsheet,
  Droplet,
  Unlock,
  Scissors,
  ScanLine,
  PenTool,
  Images,
} from 'lucide-react';
import FileUpload from './components/FileUpload';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'organize', label: 'Organize PDF' },
    { id: 'optimize', label: 'Optimize PDF' },
    { id: 'convert', label: 'Convert PDF' },
    { id: 'security', label: 'PDF Security' },
  ];

  const tools = [
    {
      id: 'merge',
      title: 'Merge PDF',
      description: 'Combine multiple PDF files into one',
      icon: Merge,
      color: 'bg-blue-500',
      category: 'organize',
    },
    {
      id: 'split',
      title: 'Split PDF',
      description: 'Extract pages from your PDF',
      icon: Split,
      color: 'bg-green-500',
      category: 'organize',
    },
    {
      id: 'compress',
      title: 'Compress PDF',
      description: 'Reduce file size while maintaining quality',
      icon: Minimize2,
      color: 'bg-purple-500',
      category: 'optimize',
    },
    {
      id: 'rotate',
      title: 'Rotate PDF',
      description: 'Rotate your PDF pages',
      icon: RotateCw,
      color: 'bg-orange-500',
      category: 'organize',
    },
    {
      id: 'protect',
      title: 'Protect PDF',
      description: 'Add password protection to your PDF',
      icon: Lock,
      color: 'bg-red-500',
      category: 'security',
    },
    {
      id: 'watermark',
      title: 'Watermark',
      description: 'Add watermark text to your PDF',
      icon: Droplet,
      color: 'bg-cyan-500',
      category: 'security',
    },
    {
      id: 'edit-pdf',
      title: 'Edit PDF',
      description: 'Add text to your PDF document',
      icon: Edit,
      color: 'bg-pink-500',
      category: 'organize',
    },
    {
      id: 'pdf-to-jpg',
      title: 'PDF to JPG',
      description: 'Convert PDF pages to images',
      icon: FileImage,
      color: 'bg-indigo-500',
      category: 'convert',
    },
    {
      id: 'jpg-to-pdf',
      title: 'JPG to PDF',
      description: 'Convert images to PDF format',
      icon: FileDown,
      color: 'bg-teal-500',
      category: 'convert',
    },
    {
      id: 'word-to-pdf',
      title: 'Word to PDF',
      description: 'Convert Word documents to PDF',
      icon: FileText,
      color: 'bg-blue-600',
      category: 'convert',
    },
    {
      id: 'pdf-to-word',
      title: 'PDF to Word',
      description: 'Extract text from PDF',
      icon: FileText,
      color: 'bg-blue-400',
      category: 'convert',
    },
    {
      id: 'pdf-to-excel',
      title: 'PDF to Excel',
      description: 'Convert PDF to spreadsheet',
      icon: FileSpreadsheet,
      color: 'bg-green-600',
      category: 'convert',
    },
    {
      id: 'unlock-pdf',
      title: 'Unlock PDF',
      description: 'Remove password from PDF',
      icon: Unlock,
      color: 'bg-yellow-500',
      category: 'security',
    },
    {
      id: 'extract-pages',
      title: 'Extract Pages',
      description: 'Select and extract specific pages',
      icon: Scissors,
      color: 'bg-rose-500',
      category: 'organize',
    },
    {
      id: 'ocr',
      title: 'OCR',
      description: 'Extract text from scanned PDFs',
      icon: ScanLine,
      color: 'bg-amber-500',
      category: 'convert',
    },
    {
      id: 'sign-pdf',
      title: 'Sign PDF',
      description: 'Add signature to your PDF',
      icon: PenTool,
      color: 'bg-violet-500',
      category: 'security',
    },
    {
      id: 'images-to-pdf',
      title: 'Images to PDF',
      description: 'Convert multiple images to PDF',
      icon: Images,
      color: 'bg-emerald-500',
      category: 'convert',
    },
  ];

  const filteredTools =
    activeCategory === 'all'
      ? tools
      : tools.filter((tool) => tool.category === activeCategory);

  return (
    <ErrorBoundary>
      <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <header className={`shadow-sm border-b sticky top-0 z-50 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setSelectedTool(null)}>
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 p-2 rounded-lg">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>PDF Magic</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!selectedTool ? (
            <>
              <div className="text-center mb-8">
                <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Hello! Let's work with PDFs
                </h2>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-colors text-sm sm:text-base ${
                        activeCategory === category.id
                          ? darkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'
                          : darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredTools.map((tool, index) => (
                  <div
                    key={tool.id}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div
                      onClick={() => setSelectedTool(tool.id)}
                      className={`rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer p-6 border ${
                        darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 ${tool.color} rounded-lg flex items-center justify-center mb-4`}>
                        <tool.icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {tool.title}
                      </h3>
                      <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {tool.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {filteredTools.length === 0 && (
                <div className="text-center py-12">
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>No tools found in this category.</p>
                </div>
              )}
            </>
          ) : (
            <div>
              <button
                onClick={() => setSelectedTool(null)}
                className={`mb-6 flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
              >
                ← Back to tools
              </button>
              <FileUpload
                toolType={selectedTool}
                onBack={() => setSelectedTool(null)}
                darkMode={darkMode}
              />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className={`border-t mt-16 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                © {new Date().getFullYear()} PDF Magic. Free online PDF editor.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
