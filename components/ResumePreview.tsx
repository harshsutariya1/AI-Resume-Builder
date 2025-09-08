
import React from 'react';
import type { ResumeData } from '../types';

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const { personalDetails, summary, experience, education, skills } = data;
  
  const renderList = (items: string) => {
    return items.split('\n').map((item, index) => (
      item.trim() && <li key={index} className="text-gray-700 mb-1">{item.replace(/^-/, '•')}</li>
    ));
  };

  return (
    <div id="resume-preview" className="bg-white p-8 font-serif shadow-lg w-[210mm] min-h-[297mm]">
      {/* Header */}
      <div className="text-center border-b pb-4 mb-6">
        <h1 className="text-4xl font-bold font-sans text-gray-800 tracking-wider">{personalDetails.fullName || 'Your Name'}</h1>
        <div className="flex justify-center items-center space-x-4 mt-2 text-sm text-gray-600">
          <span>{personalDetails.email}</span>
          {personalDetails.email && personalDetails.phoneNumber && <span>|</span>}
          <span>{personalDetails.phoneNumber}</span>
          {(personalDetails.linkedin || personalDetails.website) && (personalDetails.email || personalDetails.phoneNumber) && <span>|</span>}
          {personalDetails.linkedin && <a href={`https://${personalDetails.linkedin}`} className="text-blue-600 hover:underline">{personalDetails.linkedin}</a>}
          {personalDetails.linkedin && personalDetails.website && <span>|</span>}
          {personalDetails.website && <a href={`https://${personalDetails.website}`} className="text-blue-600 hover:underline">{personalDetails.website}</a>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold font-sans text-indigo-700 border-b-2 border-indigo-200 pb-1 mb-3 tracking-wide">Summary</h2>
          <p className="text-gray-700 text-justify">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && experience[0].jobTitle && (
        <div className="mb-6">
          <h2 className="text-xl font-bold font-sans text-indigo-700 border-b-2 border-indigo-200 pb-1 mb-3 tracking-wide">Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-bold font-sans text-gray-800">{exp.jobTitle}</h3>
                <p className="text-sm font-sans text-gray-600">{exp.startDate} - {exp.endDate}</p>
              </div>
              <h4 className="text-md font-semibold font-sans text-gray-700 italic">{exp.company}</h4>
              <ul className="mt-2 list-inside list-disc pl-2 space-y-1">
                {renderList(exp.description)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && education[0].institution && (
        <div className="mb-6">
          <h2 className="text-xl font-bold font-sans text-indigo-700 border-b-2 border-indigo-200 pb-1 mb-3 tracking-wide">Education</h2>
          {education.map(edu => (
            <div key={edu.id} className="mb-2">
               <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-bold font-sans text-gray-800">{edu.institution}</h3>
                <p className="text-sm font-sans text-gray-600">{edu.graduationDate}</p>
              </div>
              <p className="text-md font-sans text-gray-700">{edu.degree}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && (
        <div>
          <h2 className="text-xl font-bold font-sans text-indigo-700 border-b-2 border-indigo-200 pb-1 mb-3 tracking-wide">Skills</h2>
          <p className="text-gray-700">{skills}</p>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
