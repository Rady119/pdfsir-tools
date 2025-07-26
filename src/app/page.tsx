'use client';

import { useState } from 'react';
import Link from 'next/link';
import LanguageToggle from '../components/LanguageToggle';

interface Tool {
  id: string;
  title: string;
  description: string;
  category: 'popular' | 'convert' | 'edit' | 'security' | 'optimize';
  icon: string;
}

const tools: Tool[] = [
  // Popular Tools
  { id: 'merge-pdf', title: 'Merge PDF', description: 'Combine multiple PDF files into one', category: 'popular', icon: '📄' },
  { id: 'split-pdf', title: 'Split PDF', description: 'Split PDF into separate pages', category: 'popular', icon: '✂️' },
  { id: 'compress-pdf', title: 'Compress PDF', description: 'Reduce PDF file size', category: 'popular', icon: '🗜️' },
  { id: 'convert-to-pdf', title: 'Convert to PDF', description: 'Convert documents to PDF', category: 'popular', icon: '🔄' },
  
  // Convert Tools
  { id: 'pdf-to-word', title: 'PDF to Word', description: 'Convert PDF to editable Word document', category: 'convert', icon: '📝' },
  { id: 'pdf-to-excel', title: 'PDF to Excel', description: 'Convert PDF to Excel spreadsheet', category: 'convert', icon: '📊' },
  { id: 'pdf-to-powerpoint', title: 'PDF to PowerPoint', description: 'Convert PDF to PowerPoint presentation', category: 'convert', icon: '📽️' },
  { id: 'pdf-to-images', title: 'PDF to Images', description: 'Convert PDF pages to images', category: 'convert', icon: '🖼️' },
  { id: 'pdf-to-html', title: 'PDF to HTML', description: 'Convert PDF to HTML web page', category: 'convert', icon: '🌐' },
  { id: 'pdf-to-epub', title: 'PDF to EPUB', description: 'Convert PDF to EPUB e-book', category: 'convert', icon: '📚' },
  { id: 'word-to-pdf', title: 'Word to PDF', description: 'Convert Word document to PDF', category: 'convert', icon: '📄' },
  { id: 'excel-to-pdf', title: 'Excel to PDF', description: 'Convert Excel to PDF', category: 'convert', icon: '📊' },
  { id: 'powerpoint-to-pdf', title: 'PowerPoint to PDF', description: 'Convert PowerPoint to PDF', category: 'convert', icon: '📽️' },
  { id: 'images-to-pdf', title: 'Images to PDF', description: 'Convert images to PDF', category: 'convert', icon: '🖼️' },
  { id: 'html-to-pdf', title: 'HTML to PDF', description: 'Convert HTML to PDF', category: 'convert', icon: '🌐' },
  { id: 'epub-to-pdf', title: 'EPUB to PDF', description: 'Convert EPUB to PDF', category: 'convert', icon: '📚' },
  
  // Edit Tools
  { id: 'rotate-pdf', title: 'Rotate PDF', description: 'Rotate PDF pages', category: 'edit', icon: '🔄' },
  { id: 'add-watermark', title: 'Add Watermark', description: 'Add watermark to PDF', category: 'edit', icon: '💧' },
  { id: 'add-page-numbers', title: 'Add Page Numbers', description: 'Add page numbers to PDF', category: 'edit', icon: '🔢' },
  { id: 'extract-pages', title: 'Extract Pages', description: 'Extract specific pages from PDF', category: 'edit', icon: '📄' },
  { id: 'delete-pages', title: 'Delete Pages', description: 'Remove pages from PDF', category: 'edit', icon: '🗑️' },
  { id: 'rearrange-pages', title: 'Rearrange Pages', description: 'Reorder PDF pages', category: 'edit', icon: '🔀' },
  { id: 'flatten-pdf', title: 'Flatten PDF', description: 'Flatten PDF forms and annotations', category: 'edit', icon: '📋' },
  
  // Security Tools
  { id: 'protect-pdf', title: 'Protect PDF', description: 'Add password protection to PDF', category: 'security', icon: '🔒' },
  { id: 'unlock-pdf', title: 'Unlock PDF', description: 'Remove password from PDF', category: 'security', icon: '🔓' },
  
  // OCR Tool
  { id: 'ocr-pdf', title: 'OCR PDF', description: 'Extract text from scanned PDF', category: 'convert', icon: '👁️' },
];

export default function HomePage() {
  const [filter, setFilter] = useState<'all' | 'popular' | 'convert' | 'edit' | 'security' | 'optimize'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTools = tools.filter(tool => {
    const matchesFilter = filter === 'all' || tool.category === filter;
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterButtons = [
    { key: 'all', label: 'All Tools', count: tools.length },
    { key: 'popular', label: 'Most Popular', count: tools.filter(t => t.category === 'popular').length },
    { key: 'convert', label: 'Convert', count: tools.filter(t => t.category === 'convert').length },
    { key: 'edit', label: 'Edit', count: tools.filter(t => t.category === 'edit').length },
    { key: 'security', label: 'Security', count: tools.filter(t => t.category === 'security').length },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">PDFSIR</h1>
              <span className="text-sm text-gray-500 hidden sm:inline">Professional PDF Tools</span>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Professional PDF Tools
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Convert, edit, and optimize your PDF files with 25+ powerful tools
          </p>
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search for a tool..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Buttons */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {filterButtons.map((button) => (
              <button
                key={button.key}
                onClick={() => setFilter(button.key as any)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${filter === button.key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {button.label} ({button.count})
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <Link key={tool.id} href={`/tool/${tool.id}`}>
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer group">
                <div className="text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                    {tool.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No tools found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">PDFSIR Tools</h3>
            <p className="text-gray-400 mb-6">
              Professional PDF processing platform with 25+ tools for all your document needs
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <span>Secure Processing</span>
              <span>•</span>
              <span>Files Auto-Deleted</span>
              <span>•</span>
              <span>No Registration Required</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
