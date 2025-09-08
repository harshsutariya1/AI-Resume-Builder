
import React from 'react';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';

interface SummaryFormProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const SummaryForm: React.FC<SummaryFormProps> = ({ value, onChange, onGenerate, isLoading }) => {
  return (
    <div className="space-y-4">
      <Textarea
        label="Professional Summary"
        id="summary"
        name="summary"
        rows={5}
        value={value}
        onChange={onChange}
        placeholder="A brief overview of your career, skills, and goals."
      />
      <div className="flex justify-end">
        <Button onClick={onGenerate} disabled={isLoading}>
          {isLoading ? (
             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 2a1 1 0 00-1 1v1.5a.5.5 0 001 0V3h1.28a1 1 0 01.97.757l.72 2.16a1 1 0 01-.26 1.033l-1.4 1.4a.5.5 0 000 .707l4.243 4.243a.5.5 0 00.707 0l1.4-1.4a1 1 0 011.033-.26l2.16.72a1 1 0 01.757.97V16h-.5a.5.5 0 000 1h1.5a1 1 0 001-1v-2.5a.5.5 0 00-1 0V15h-1.28a1 1 0 01-.97-.757l-.72-2.16a1 1 0 01.26-1.033l1.4-1.4a.5.5 0 000-.707L9.414 4.586a.5.5 0 00-.707 0l-1.4 1.4a1 1 0 01-1.033.26L4.113 7.97A1 1 0 013.143 7.21V5h.5a.5.5 0 000-1H2.5a.5.5 0 00-.5.5V5a.5.5 0 001 0v-.5H5V2zm11.5 5.5a.5.5 0 000-1h-1.5a.5.5 0 000 1h1.5zm-2.5 2.5a.5.5 0 00-1 0v1.5a.5.5 0 001 0v-1.5z" clipRule="evenodd" />
            </svg>
          )}
          {isLoading ? 'Generating...' : 'Generate with AI'}
        </Button>
      </div>
    </div>
  );
};
