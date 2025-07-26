# PDFSIR Tools - Professional PDF Processing Platform

A comprehensive web-based PDF processing platform with 25+ tools, built with Next.js and integrated with PDF.co API.

## 🚀 Features

### PDF Tools Available
- **Convert Tools (13):** PDF ↔ Word, Excel, PowerPoint, Images, HTML, EPUB
- **Edit Tools (7):** Merge, Split, Rotate, Add Watermark, Page Numbers, Extract/Delete/Rearrange Pages, Flatten
- **Security Tools (2):** Protect and Unlock PDF with password management
- **Processing Tools (4):** Compress, OCR text extraction, and optimization

### Platform Features
- ✅ Modern, responsive design with Tailwind CSS
- ✅ Multilingual support (English/Arabic) with RTL layout
- ✅ Drag-and-drop file upload with progress indicators
- ✅ Professional UI similar to PDF Candy
- ✅ Secure file processing via PDF.co API
- ✅ Auto file deletion after processing
- ✅ No registration required

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS
- **Backend:** Next.js API Routes
- **File Processing:** PDF.co API integration
- **UI Components:** Custom components with shadcn/ui base
- **Styling:** Tailwind CSS with custom design system
- **File Upload:** React Dropzone
- **Internationalization:** Built-in Next.js i18n support

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd pdfsir-tools
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   PDF_CO_API_KEY=your_pdf_co_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8000`

## 🔧 Configuration

### PDF.co API Setup
1. Sign up at [PDF.co](https://pdf.co)
2. Get your API key from the dashboard
3. Add it to your `.env.local` file
4. The platform will automatically use this key for all PDF processing

### Environment Variables
```env
PDF_CO_API_KEY=your_api_key_here
```

## 📁 Project Structure

```
pdfsir-tools/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── [toolName]/
│   │   │       └── route.ts          # API endpoints for PDF processing
│   │   ├── tool/
│   │   │   └── [toolName]/
│   │   │       └── page.tsx          # Individual tool pages
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Homepage
│   ├── components/
│   │   ├── FileUploader.tsx          # Drag-and-drop file upload
│   │   ├── ProgressIndicator.tsx     # Processing progress display
│   │   ├── LanguageToggle.tsx        # English/Arabic language switcher
│   │   └── ui/                       # shadcn/ui components
│   └── lib/
│       ├── pdfCoService.ts           # PDF.co API integration
│       └── utils.ts                  # Utility functions
├── public/                           # Static assets
├── .env.local                        # Environment variables (create this)
├── next.config.ts                    # Next.js configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── package.json                      # Dependencies and scripts
└── README.md                         # This file
```

## 🎨 Available Tools

### Conversion Tools
- Convert to PDF (Word, Excel, PowerPoint, Images, HTML, EPUB)
- PDF to Word, Excel, PowerPoint, Images, HTML, EPUB

### Editing Tools
- Merge PDF files
- Split PDF into pages
- Rotate PDF pages
- Add watermarks
- Add page numbers
- Extract specific pages
- Delete pages
- Rearrange pages
- Flatten PDF forms

### Security Tools
- Protect PDF with password
- Remove password protection

### Processing Tools
- Compress PDF files
- OCR text extraction
- Optimize PDF files

## 🌐 Internationalization

The platform supports:
- **English (EN)** - Default language
- **Arabic (العربية)** - Full RTL support

Language switching is available via the toggle in the header.

## 🔒 Security Features

- Secure file upload with validation
- Files processed via PDF.co API (not stored locally)
- Automatic file deletion after processing
- Environment variable protection for API keys
- File size limits (50MB maximum)
- Format validation for each tool

## 📱 Responsive Design

The platform is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `PDF_CO_API_KEY` environment variable in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## 📄 API Documentation

### Tool Processing Endpoint
```
POST /api/[toolName]
```

**Parameters:**
- `file`: The PDF or document file to process
- `toolName`: The name of the tool (e.g., 'merge-pdf', 'split-pdf')

**Response:**
```json
{
  "success": true,
  "resultUrl": "https://...",
  "message": "File processed successfully",
  "originalSize": 1024000,
  "originalName": "document.pdf"
}
```

### Tool Information Endpoint
```
GET /api/[toolName]
```

**Response:**
```json
{
  "title": "Merge PDF",
  "description": "Combine multiple PDF files into one document",
  "acceptedFormats": [".pdf"],
  "category": "edit"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
1. Check the documentation above
2. Review the PDF.co API documentation
3. Open an issue in the repository

## 🔄 Updates

The platform is designed to be easily extensible. To add new tools:
1. Add the tool configuration in `/src/app/api/[toolName]/route.ts`
2. Add the tool to the homepage grid in `/src/app/page.tsx`
3. The dynamic routing will handle the rest automatically

---

**Built with ❤️ using Next.js, Tailwind CSS, and PDF.co API**
