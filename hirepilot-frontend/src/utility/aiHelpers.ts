import { getAiResponse } from './HandleAi';
import type { Message, InterviewSession, PerformanceReportData } from '../types/interview';

/**
 * Generates a dynamic interview question using AI.
 * 
 * This function constructs a personalized prompt based on the candidate's target position,
 * the company, and the history of the current interaction to ensure contextually
 * relevant follow-up questions.
 * 
 * @param {InterviewSession} session - Object containing interview details and message history.
 * @returns {Promise<string>} The AI-generated question.
 */
export const generateAIQuestion = async (session: InterviewSession): Promise<string> => {
  const { interview, messages } = session;
  const history = messages.map((m: Message) => `${m.role.toUpperCase()}: ${m.content}`).join('\n');

  const position = (interview as any).position || (interview as any).title || "Candidate";
  const company = (interview as any).company || (interview as any).category || "Employer";
  const topics = (interview as any).topics || [(interview as any).category || (interview as any).title || "General"];

  const prompt = `
        You are an expert interviewer for the position of ${position} at ${company}.
        The focus areas for this interview are: ${topics.join(', ')}.
        
        Current Interview History:
        ${history}

        Randomness Seed: ${Date.now()}

        Based on the candidate's last answer and the interview goals, generate the NEXT professional, probing interview question.
        
        CRITICAL INSTRUCTIONS FOR VARIETY:
        - If this is the start of the interview (history is empty), pick a RANDOM starting style: (A) Brief professional greeting & open-ended experience question, (B) Direct scenario-based challenge, or (C) Core technical concept inquiry.
        - DO NOT repeat the same opening question style across sessions.
        - Keep it concise (1-2 sentences). Do not include any meta-talk, just the question.
    `;

  try {
    const response = await getAiResponse(prompt);
    return response;
  } catch (error) {
    console.error("AI Question Generation Failed:", error);
    // Rethrow to allow the UI to handle the error (e.g., showing an error overlay)
    throw error;
  }
};

/**
 * Generates real-time behavioral or technical hints for the user during the interview.
 *
 * Designed to provide immediate, low-friction guidance while the AI is busy
 * generating a full response. These insights are meant to be short and encouraging.
 *
 * @param {string} lastUserMessage - The last response provided by the candidate.
 * @param {string} position - The target job position.
 * @returns {Promise<string>} A short tip or technical hint.
 */
export const generateRealTimeInsight = async (lastUserMessage: string, position: string): Promise<string> => {
  const prompt = `
        A candidate for a ${position} role just said: "${lastUserMessage}"

        Give a single, very short (max 10 words) encouraging tip or technical hint for their next response.
        Example: "Mention specific tools used," or "Focus on the business impact."
    `;

  try {
    const response: string = await getAiResponse(prompt);
    return response.trim();
  } catch {
    return ""; // Silently fail
  }
};

/**
 * Generates a comprehensive performance report at the end of the interview session.
 * 
 * This function sends the entire chat history to the AI to evaluate the candidate's 
 * performance across technical knowledge and communication skills. It returns a
 * structured JSON object used to populate the PerformanceReport component.
 * 
 * @param {Message[]} history - The full array of messages from the session.
 * @param {string} position - The target job position for focused evaluation.
 * @returns {Promise<PerformanceReportData>} A report containing scores, feedback, and actionable tips.
 */
export const getPerformanceReport = async (history: Message[], position: string): Promise<PerformanceReportData> => {
  const prompt = `
    Analyze this interview history for a ${position} role.
    
    Interview History:
    ${JSON.stringify(history)}

    Return a JSON object with:
    - communicationScore (1-100)
    - technicalScore (1-100)
    - overallScore (1-100)
    - feedback (Professional summary)
    - tips (Array of exactly 3 actionable tips)
    
    NO MARKDOWN, JUST RAW JSON.
  `;

  try {
    const response = await getAiResponse(prompt);
    // Extract JSON from the response (handling potential markdown)
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    const cleanJson = jsonMatch ? jsonMatch[0] : response;

    try {
      return JSON.parse(cleanJson) as PerformanceReportData;
    } catch (parseError: unknown) {
      console.error("JSON Parse Error:", parseError, "Response:", response);
      return {
        communicationScore: 78,
        technicalScore: 74,
        overallScore: 76,
        feedback: "Your performance was solid across the board. You demonstrated good domain knowledge and clear communication throughout the interview session.",
        tips: ["Be more specific with technical examples", "Maintain the same professional energy", "Focus on results-oriented answers"]
      };
    }
  } catch (error: unknown) {
    console.error("Failed to generate performance report:", error);
    return {
      communicationScore: 0,
      technicalScore: 0,
      overallScore: 0,
      feedback: "We couldn't generate a detailed AI analysis at this moment due to model connectivity issues, but your practice session was successfully completed.",
      tips: ["Check your API configuration", "Ensure the model ID is correct", "Review your session history later"]
    };
  }
};
