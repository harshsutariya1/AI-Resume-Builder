import React from 'react';
import type { Education } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface EducationFormProps {
  data: Education[];
  onChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ data, onChange, onAdd, onRemove }) => {
  return (
    <div className="space-y-6">
      {data.map((edu, index) => (
        <div key={edu.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50/50 space-y-4">
          <h3 className="text-md font-semibold text-gray-600 border-b pb-2">Education #{index + 1}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Institution" name="institution" value={edu.institution} onChange={(e) => onChange(index, e)} />
            <Input label="Degree / Certificate" name="degree" value={edu.degree} onChange={(e) => onChange(index, e)} />
            <Input label="Graduation Date" name="graduationDate" type="text" placeholder="May 2018" value={edu.graduationDate} onChange={(e) => onChange(index, e)} />
          </div>
          <div className="flex justify-end">
            <Button variant="danger" size="sm" onClick={() => onRemove(index)}>Remove</Button>
          </div>
        </div>
      ))}
      <div className="flex justify-start">
        <Button onClick={onAdd}>+ Add Education</Button>
      </div>
    </div>
  );
};