import React from 'react';
import type { ResumeData, Experience, Education } from '../types';
import { PersonalDetailsForm } from './formSections/PersonalDetailsForm';
import { SummaryForm } from './formSections/SummaryForm';
import { ExperienceForm } from './formSections/ExperienceForm';
import { EducationForm } from './formSections/EducationForm';
import { SkillsForm } from './formSections/SkillsForm';
import { Accordion } from './ui/Accordion';
import { generateSummary, generateExperiencePoints } from '../services/geminiService';

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

// Icon Components (defined here for simplicity)
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);
const SummaryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
);
const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const GraduationCapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" /></svg>
);
const WrenchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);


export const ResumeForm: React.FC<ResumeFormProps> = ({ resumeData, setResumeData }) => {
    const [loadingStates, setLoadingStates] = React.useState<{ [key: string]: boolean }>({});

    const handlePersonalDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => ({ ...prev, personalDetails: { ...prev.personalDetails, [name]: value } }));
    };

    const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setResumeData(prev => ({ ...prev, summary: e.target.value }));
    };

    const handleGenerateSummary = async () => {
        setLoadingStates(prev => ({ ...prev, summary: true }));
        const generatedSummary = await generateSummary(resumeData);
        setResumeData(prev => ({ ...prev, summary: generatedSummary }));
        setLoadingStates(prev => ({ ...prev, summary: false }));
    };

    const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newExperience = [...resumeData.experience];
        newExperience[index] = { ...newExperience[index], [name]: value };
        setResumeData(prev => ({ ...prev, experience: newExperience }));
    };

    const handleAddExperience = () => {
        const newExperience: Experience = { id: crypto.randomUUID(), jobTitle: '', company: '', startDate: '', endDate: '', description: '' };
        setResumeData(prev => ({ ...prev, experience: [...prev.experience, newExperience] }));
    };

    const handleRemoveExperience = (index: number) => {
        const newExperience = resumeData.experience.filter((_, i) => i !== index);
        setResumeData(prev => ({ ...prev, experience: newExperience }));
    };

    const handleGenerateExperience = async (index: number) => {
        const exp = resumeData.experience[index];
        setLoadingStates(prev => ({ ...prev, [exp.id]: true }));
        const points = await generateExperiencePoints(exp);
        const newExperience = [...resumeData.experience];
        newExperience[index].description = points;
        setResumeData(prev => ({ ...prev, experience: newExperience }));
        setLoadingStates(prev => ({ ...prev, [exp.id]: false }));
    };


    const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newEducation = [...resumeData.education];
        newEducation[index] = { ...newEducation[index], [name]: value };
        setResumeData(prev => ({ ...prev, education: newEducation }));
    };

    const handleAddEducation = () => {
        const newEducation: Education = { id: crypto.randomUUID(), institution: '', degree: '', graduationDate: '' };
        setResumeData(prev => ({ ...prev, education: [...prev.education, newEducation] }));
    };

    const handleRemoveEducation = (index: number) => {
        const newEducation = resumeData.education.filter((_, i) => i !== index);
        setResumeData(prev => ({ ...prev, education: newEducation }));
    };

    const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setResumeData(prev => ({ ...prev, skills: e.target.value }));
    };

  return (
    <div className="p-6">
        <Accordion title="Personal Details" icon={<UserIcon />} isOpenDefault={true}>
            <PersonalDetailsForm data={resumeData.personalDetails} onChange={handlePersonalDetailsChange} />
        </Accordion>
        <Accordion title="Professional Summary" icon={<SummaryIcon />}>
            <SummaryForm value={resumeData.summary} onChange={handleSummaryChange} onGenerate={handleGenerateSummary} isLoading={!!loadingStates.summary} />
        </Accordion>
        <Accordion title="Work Experience" icon={<BriefcaseIcon />}>
            <ExperienceForm data={resumeData.experience} onChange={handleExperienceChange} onAdd={handleAddExperience} onRemove={handleRemoveExperience} onGenerate={handleGenerateExperience} loadingStates={loadingStates}/>
        </Accordion>
        <Accordion title="Education" icon={<GraduationCapIcon />}>
            <EducationForm data={resumeData.education} onChange={handleEducationChange} onAdd={handleAddEducation} onRemove={handleRemoveEducation} />
        </Accordion>
        <Accordion title="Skills" icon={<WrenchIcon />}>
            <SkillsForm value={resumeData.skills} onChange={handleSkillsChange} />
        </Accordion>
    </div>
  );
};