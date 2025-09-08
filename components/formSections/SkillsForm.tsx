
import React from 'react';
import { Textarea } from '../ui/Textarea';

interface SkillsFormProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ value, onChange }) => {
  return (
    <div>
      <Textarea
        label="Skills"
        id="skills"
        name="skills"
        rows={4}
        value={value}
        onChange={onChange}
        placeholder="JavaScript, React, Node.js, Project Management, Agile..."
      />
      <p className="text-xs text-gray-500 mt-1">Enter skills separated by commas.</p>
    </div>
  );
};
