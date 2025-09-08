import React from 'react';
import type { Experience } from '../../types';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';

interface ExperienceFormProps {
  data: Experience[];
  onChange: (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onGenerate: (index: number) => void;
  loadingStates: { [key: string]: boolean };
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onChange, onAdd, onRemove, onGenerate, loadingStates }) => {
  return (
    <div className="space-y-6">
      {data.map((exp, index) => (
        <div key={exp.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50/50 space-y-4">
           <h3 className="text-md font-semibold text-gray-600 border-b pb-2">Experience #{index + 1}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Job Title" name="jobTitle" value={exp.jobTitle} onChange={(e) => onChange(index, e)} />
            <Input label="Company" name="company" value={exp.company} onChange={(e) => onChange(index, e)} />
            <Input label="Start Date" name="startDate" type="text" placeholder="Jan 2020" value={exp.startDate} onChange={(e) => onChange(index, e)} />
            <Input label="End Date" name="endDate" type="text" placeholder="Present" value={exp.endDate} onChange={(e) => onChange(index, e)} />
          </div>
          <Textarea label="Description" name="description" rows={5} value={exp.description} onChange={(e) => onChange(index, e)} placeholder="- Led a team of developers...&#10;- Increased efficiency by 30%..." />
          <div className="flex justify-between items-center pt-2">
            <Button variant="danger" size="sm" onClick={() => onRemove(index)}>Remove</Button>
            <Button variant="secondary" size="sm" onClick={() => onGenerate(index)} disabled={loadingStates[exp.id]}>
              {loadingStates[exp.id] ? (
                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 2a1 1 0 00-1 1v1.5a.5.5 0 001 0V3h1.28a1 1 0 01.97.757l.72 2.16a1 1 0 01-.26 1.033l-1.4 1.4a.5.5 0 000 .707l4.243 4.243a.5.5 0 00.707 0l1.4-1.4a1 1 0 011.033-.26l2.16.72a1 1 0 01.757.97V16h-.5a.5.5 0 000 1h1.5a1 1 0 001-1v-2.5a.5.5 0 00-1 0V15h-1.28a1 1 0 01-.97-.757l-.72-2.16a1 1 0 01.26-1.033l1.4-1.4a.5.5 0 000-.707L9.414 4.586a.5.5 0 00-.707 0l-1.4 1.4a1 1 0 01-1.033.26L4.113 7.97A1 1 0 013.143 7.21V5h.5a.5.5 0 000-1H2.5a.5.5 0 00-.5.5V5a.5.5 0 001 0v-.5H5V2z" clipRule="evenodd" />
                </svg>
              )}
              {loadingStates[exp.id] ? 'Generating...' : 'AI-Assist Points'}
            </Button>
          </div>
        </div>
      ))}
      <div className="flex justify-start">
        <Button onClick={onAdd}>+ Add Experience</Button>
      </div>
    </div>
  );
};