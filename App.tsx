import React, { useState } from 'react';
import type { ResumeData } from './types';
import { ResumeForm } from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import { Button } from './components/ui/Button';

declare global {
    interface Window {
        jspdf: any;
        html2canvas: any;
    }
}

const initialResumeData: ResumeData = {
  personalDetails: {
    fullName: '',
    email: '',
    phoneNumber: '',
    linkedin: '',
    website: '',
  },
  summary: '',
  experience: [
    { id: crypto.randomUUID(), jobTitle: '', company: '', startDate: '', endDate: '', description: '' },
  ],
  education: [
    { id: crypto.randomUUID(), institution: '', degree: '', graduationDate: '' },
  ],
  skills: '',
};

const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    const { jsPDF } = window.jspdf;
    const canvas = await window.html2canvas(document.querySelector('#resume-preview') as HTMLElement, {
        scale: 4, // Higher scale for better quality
        useCORS: true,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = canvasWidth / canvasHeight;
    const imgWidth = pdfWidth;
    const imgHeight = imgWidth / ratio;

    // Check if content exceeds one page, if so, add a new page (basic implementation)
    // A more robust solution would involve splitting the canvas across pages.
    if (imgHeight > pdfHeight) {
      console.warn("Resume content might be too long for a single PDF page.");
    }

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('resume.pdf');
    setIsGeneratingPdf(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
       <header className="bg-white shadow-md z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7.5 3.75A2.25 2.25 0 005.25 6v8.25a2.25 2.25 0 002.25 2.25h5A2.25 2.25 0 0014.75 14.25V6A2.25 2.25 0 0012.5 3.75h-5z" />
                  <path d="M4.582 6.332C4.032 6.784 3.75 7.436 3.75 8.138v3.724c0 .702.282 1.354.832 1.806l.004.004a.75.75 0 001.056-1.064l-.004-.004C5.12 12.16 5.25 11.69 5.25 11.25v-2.5c0-.44-.13-1.096-.582-1.418zM15.418 6.332a.75.75 0 00-1.056 1.064l.004.004c.514.444.664.913.664 1.352v2.5c0 .44-.13 1.096-.668 1.418l-.004.004a.75.75 0 001.056 1.064l.004-.004c.55-.452.832-1.104.832-1.806V8.138c0-.702-.282-1.354-.832-1.806z" />
                </svg>
                <h1 className="text-2xl font-bold text-gray-800 ml-2">AI Resume Builder</h1>
            </div>
            <Button onClick={handleDownloadPdf} disabled={isGeneratingPdf}>
                {isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-white overflow-y-auto">
          <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
        </div>
        <div className="bg-slate-200 flex justify-center items-start p-8 overflow-y-auto">
          <div className="transform scale-90 origin-top">
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;