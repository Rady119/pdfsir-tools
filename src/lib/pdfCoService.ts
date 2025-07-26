export interface PDFCoResponse {
  url?: string;
  error?: boolean;
  message?: string;
  remainingCredits?: number;
}

export async function pdfCoProcess(toolName: string, file: File): Promise<PDFCoResponse> {
  const apiKey = process.env.PDF_CO_API_KEY;
  if (!apiKey) {
    throw new Error('PDF.co API key not configured');
  }

  // Map tool names to PDF.co endpoints
  const endpointMap: Record<string, string> = {
    'convert-to-pdf': 'https://api.pdf.co/v1/pdf/convert/from/doc',
    'merge-pdf': 'https://api.pdf.co/v1/pdf/merge',
    'split-pdf': 'https://api.pdf.co/v1/pdf/split',
    'compress-pdf': 'https://api.pdf.co/v1/pdf/optimize',
    'rotate-pdf': 'https://api.pdf.co/v1/pdf/edit/rotate',
    'protect-pdf': 'https://api.pdf.co/v1/pdf/security/add',
    'unlock-pdf': 'https://api.pdf.co/v1/pdf/security/remove',
    'add-watermark': 'https://api.pdf.co/v1/pdf/edit/add/text',
    'ocr-pdf': 'https://api.pdf.co/v1/pdf/ocr',
    'add-page-numbers': 'https://api.pdf.co/v1/pdf/edit/add/text',
    'extract-pages': 'https://api.pdf.co/v1/pdf/split',
    'delete-pages': 'https://api.pdf.co/v1/pdf/edit/delete-pages',
    'rearrange-pages': 'https://api.pdf.co/v1/pdf/edit/rearrange-pages',
    'flatten-pdf': 'https://api.pdf.co/v1/pdf/edit/flatten',
    'pdf-to-word': 'https://api.pdf.co/v1/pdf/convert/to/doc',
    'pdf-to-excel': 'https://api.pdf.co/v1/pdf/convert/to/xls',
    'pdf-to-powerpoint': 'https://api.pdf.co/v1/pdf/convert/to/ppt',
    'pdf-to-images': 'https://api.pdf.co/v1/pdf/convert/to/png',
    'pdf-to-html': 'https://api.pdf.co/v1/pdf/convert/to/html',
    'pdf-to-epub': 'https://api.pdf.co/v1/pdf/convert/to/epub',
    'word-to-pdf': 'https://api.pdf.co/v1/pdf/convert/from/doc',
    'excel-to-pdf': 'https://api.pdf.co/v1/pdf/convert/from/xls',
    'powerpoint-to-pdf': 'https://api.pdf.co/v1/pdf/convert/from/ppt',
    'images-to-pdf': 'https://api.pdf.co/v1/pdf/convert/from/image',
    'html-to-pdf': 'https://api.pdf.co/v1/pdf/convert/from/html',
    'epub-to-pdf': 'https://api.pdf.co/v1/pdf/convert/from/epub'
  };

  const endpoint = endpointMap[toolName];
  if (!endpoint) {
    throw new Error(`No endpoint configured for tool: ${toolName}`);
  }

  try {
    // First, upload the file to get a URL
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    const uploadResponse = await fetch('https://api.pdf.co/v1/file/upload', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
      },
      body: uploadFormData,
    });

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed: ${uploadResponse.statusText}`);
    }

    const uploadResult = await uploadResponse.json();
    if (uploadResult.error) {
      throw new Error(uploadResult.message || 'Upload failed');
    }

    // Now process the file using the uploaded URL
    const processData = {
      url: uploadResult.url,
      async: false
    };

    const processResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(processData),
    });

    if (!processResponse.ok) {
      throw new Error(`Processing failed: ${processResponse.statusText}`);
    }

    const result = await processResponse.json();
    if (result.error) {
      throw new Error(result.message || 'Processing failed');
    }

    return result;
  } catch (error: any) {
    console.error('PDF.co processing error:', error);
    throw new Error(error.message || 'PDF processing failed');
  }
}
