
import { GoogleGenAI } from "@google/genai";
import type { ResumeData, Experience } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSummary = async (resumeData: ResumeData): Promise<string> => {
  const prompt = `
    You are an expert resume writer. Based on the following information, write a compelling and professional resume summary in 3-4 sentences.
    - Job Target: ${resumeData.experience[0]?.jobTitle || 'Experienced Professional'}
    - Key Skills: ${resumeData.skills}
    - Recent Experience: ${resumeData.experience[0]?.company || ''} from ${resumeData.experience[0]?.startDate || ''} to ${resumeData.experience[0]?.endDate || 'Present'}
    
    Focus on creating a powerful opening statement that grabs the reader's attention.
  `;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Error: Could not generate summary. Please try again.";
  }
};

export const generateExperiencePoints = async (experience: Experience): Promise<string> => {
  const prompt = `
    You are an expert resume writer. For a role as a "${experience.jobTitle}" at "${experience.company}", write 3-5 concise, action-oriented bullet points describing key responsibilities and achievements. 
    Use the STAR (Situation, Task, Action, Result) method where possible. Start each point with a powerful action verb.
    Return the points as a single string, with each point starting with a hyphen and separated by a newline.
    Example:
    - Spearheaded a project that increased user engagement by 20%.
    - Managed a team of 5 engineers to deliver features ahead of schedule.
  `;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating experience points:", error);
    return "Error: Could not generate bullet points.";
  }
};
