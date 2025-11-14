
import { GoogleGenAI } from "@google/genai";
import { Student } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateImprovementPlan = async (student: Student): Promise<string> => {
  const prompt = `
    Based on the following student data, generate a personalized improvement plan. The plan should be encouraging, actionable, and tailored to the student's specific challenges. Format the response as markdown.

    Student Name: ${student.name}
    Class: ${student.class}
    Risk Level: ${student.riskLevel}

    Academic Performance:
    ${student.marks.map(m => `- ${m.subject}: ${m.score}/${m.maxScore}`).join('\n')}

    Attendance:
    - Recent Absences: ${student.attendance.filter(a => a.status === 'Absent').length}
    - Recent Lates: ${student.attendance.filter(a => a.status === 'Late').length}

    Behavioral Notes:
    ${student.behavior.map(b => `- ${b.report} (by ${b.reporter})`).join('\n')}

    Engagement Score: ${student.engagement}/100
    Mental Well-being Score: ${student.wellBeingScore}/10

    Generate a plan with sections for:
    1.  **Academic Focus Areas:** Specific subjects to work on and strategies to use.
    2.  **Attendance & Punctuality:** Importance and tips for improvement.
    3.  **Engagement & Participation:** How to be more involved in class.
    4.  **Well-being & Support:** Suggestions for managing stress and seeking help.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating improvement plan:", error);
    return "Could not generate an improvement plan at this time. Please try again later.";
  }
};

export const getChatbotResponse = async (history: { role: string, parts: { text: string }[] }[]): Promise<string> => {
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
        systemInstruction: "You are a friendly, empathetic, and supportive student counselor chatbot. Your goal is to provide helpful advice, listen to student's concerns, and guide them towards positive solutions. Keep your responses concise, encouraging, and easy to understand. Do not give medical advice. If a student mentions serious issues like self-harm, immediately recommend they speak to a trusted adult or a professional counselor.",
    },
    history: history.slice(0, -1),
  });

  const lastMessage = history[history.length - 1];
  const messageText = lastMessage?.parts[0]?.text ?? '';

  try {
    const response = await chat.sendMessage({ message: messageText });
    return response.text;
  } catch (error) {
    console.error("Error getting chatbot response:", error);
    return "I'm having a little trouble connecting right now. Please try again in a moment.";
  }
};
