import { NextRequest, NextResponse } from 'next/server';
import { pdfCoProcess } from '../../../lib/pdfCoService';

export async function POST(
  request: NextRequest,
  { params }: { params: { toolName: string } }
) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 50MB.' },
        { status: 400 }
      );
    }

    // Process the file using PDF.co
    const result = await pdfCoProcess(params.toolName, file);

    return NextResponse.json({
      success: true,
      resultUrl: result.url,
      message: 'File processed successfully',
      remainingCredits: result.remainingCredits,
      originalSize: file.size,
      originalName: file.name
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Processing failed',
        success: false 
      },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { toolName: string } }
) {
  // Return tool information
  const toolInfo = getToolInfo(params.toolName);
  
  if (!toolInfo) {
    return NextResponse.json(
      { error: 'Tool not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(toolInfo);
}

function getToolInfo(toolName: string) {
  const toolsInfo: Record<string, any> = {
    'convert-to-pdf': {
      title: 'Convert to PDF',
      description: 'Convert Word, Excel, PowerPoint, and other documents to PDF',
      acceptedFormats: ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.rtf'],
      category: 'convert'
    },
    'merge-pdf': {
      title: 'Merge PDF',
      description: 'Combine multiple PDF files into one document',
      acceptedFormats: ['.pdf'],
      category: 'edit'
    },
    'split-pdf': {
      title: 'Split PDF',
      description: 'Split a PDF file into separate pages or ranges',
      acceptedFormats: ['.pdf'],
      category: 'edit'
    },
    'compress-pdf': {
      title: 'Compress PDF',
      description: 'Reduce PDF file size while maintaining quality',
      acceptedFormats: ['.pdf'],
      category: 'optimize'
    },
    'rotate-pdf': {
      title: 'Rotate PDF',
      description: 'Rotate PDF pages clockwise or counterclockwise',
      acceptedFormats: ['.pdf'],
      category: 'edit'
    },
    'protect-pdf': {
      title: 'Protect PDF',
      description: 'Add password protection to your PDF files',
      acceptedFormats: ['.pdf'],
      category: 'security'
    },
    'unlock-pdf': {
      title: 'Unlock PDF',
      description: 'Remove password protection from PDF files',
      acceptedFormats: ['.pdf'],
      category: 'security'
    },
    'add-watermark': {
      title: 'Add Watermark',
      description: 'Add text or image watermarks to PDF pages',
      acceptedFormats: ['.pdf'],
      category: 'edit'
    },
    'ocr-pdf': {
      title: 'OCR PDF',
      description: 'Extract text from scanned PDF documents',
      acceptedFormats: ['.pdf'],
      category: 'convert'
    },
    'add-page-numbers': {
      title: 'Add Page Numbers',
      description: 'Add page numbers to your PDF documents',
      acceptedFormats: ['.pdf'],
      category: 'edit'
    },
    'extract-pages': {
      title: 'Extract Pages',
      description: 'Extract specific pages from PDF documents',
      acceptedFormats: ['.pdf'],
      category: 'edit'
    },
    'delete-pages': {
      title: 'Delete Pages',
      description: 'Remove specific pages from PDF documents',
      acceptedFormats: ['.pdf'],
      category: 'edit'
    },
    'rearrange-pages': {
      title: 'Rearrange Pages',
      description: 'Reorder pages in your PDF documents',
      acceptedFormats: ['.pdf'],
      category: 'edit'
    },
    'flatten-pdf': {
      title: 'Flatten PDF',
      description: 'Flatten PDF forms and annotations',
      acceptedFormats: ['.pdf'],
      category: 'edit'
    },
    'pdf-to-word': {
      title: 'PDF to Word',
      description: 'Convert PDF files to editable Word documents',
      acceptedFormats: ['.pdf'],
      category: 'convert'
    },
    'pdf-to-excel': {
      title: 'PDF to Excel',
      description: 'Convert PDF files to Excel spreadsheets',
      acceptedFormats: ['.pdf'],
      category: 'convert'
    },
    'pdf-to-powerpoint': {
      title: 'PDF to PowerPoint',
      description: 'Convert PDF files to PowerPoint presentations',
      acceptedFormats: ['.pdf'],
      category: 'convert'
    },
    'pdf-to-images': {
      title: 'PDF to Images',
      description: 'Convert PDF pages to PNG or JPG images',
      acceptedFormats: ['.pdf'],
      category: 'convert'
    },
    'pdf-to-html': {
      title: 'PDF to HTML',
      description: 'Convert PDF files to HTML web pages',
      acceptedFormats: ['.pdf'],
      category: 'convert'
    },
    'pdf-to-epub': {
      title: 'PDF to EPUB',
      description: 'Convert PDF files to EPUB e-book format',
      acceptedFormats: ['.pdf'],
      category: 'convert'
    },
    'word-to-pdf': {
      title: 'Word to PDF',
      description: 'Convert Word documents to PDF format',
      acceptedFormats: ['.doc', '.docx'],
      category: 'convert'
    },
    'excel-to-pdf': {
      title: 'Excel to PDF',
      description: 'Convert Excel spreadsheets to PDF format',
      acceptedFormats: ['.xls', '.xlsx'],
      category: 'convert'
    },
    'powerpoint-to-pdf': {
      title: 'PowerPoint to PDF',
      description: 'Convert PowerPoint presentations to PDF format',
      acceptedFormats: ['.ppt', '.pptx'],
      category: 'convert'
    },
    'images-to-pdf': {
      title: 'Images to PDF',
      description: 'Convert images to PDF documents',
      acceptedFormats: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'],
      category: 'convert'
    },
    'html-to-pdf': {
      title: 'HTML to PDF',
      description: 'Convert HTML web pages to PDF documents',
      acceptedFormats: ['.html', '.htm'],
      category: 'convert'
    },
    'epub-to-pdf': {
      title: 'EPUB to PDF',
      description: 'Convert EPUB e-books to PDF format',
      acceptedFormats: ['.epub'],
      category: 'convert'
    }
  };

  return toolsInfo[toolName] || null;
}
