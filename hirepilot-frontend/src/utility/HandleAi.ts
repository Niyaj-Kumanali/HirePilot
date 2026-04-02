import { GoogleGenerativeAI, type GenerateContentResponse } from "@google/generative-ai";
import type { Message } from "../types/interview";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.error("API Key is missing! Check Vercel Env Variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const MODEL_ID = "gemini-2.5-flash";

interface ChatEntry {
    role: "user" | "model";
    parts: { text: string }[];
}

/**
 * Sends a single prompt to the Gemini AI and returns the text response.
 * Used for one-off tasks like question generation or performance analysis.
 * 
 * @param {string} prompt - The text to send to the AI.
 * @returns {Promise<string>} The AI's response text.
 * @throws {Error} Specific messages for rate limits or configuration issues.
 */
export const getAiResponse = async (prompt: string): Promise<string> => {
    try {
        const model = genAI.getGenerativeModel({
            model: MODEL_ID,
            generationConfig: { temperature: 0.7 }
        });

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error: unknown) {
        let errorMessage = "AI Error";
        if (error instanceof Error) {
            if (error.message.includes("404") || error.message.includes("not found")) {
                errorMessage = "Model not found. Please check your configuration.";
            } else if (error.message.includes("429")) {
                errorMessage = "Rate limit exceeded. Please wait a moment.";
            }
            console.error(`AI Error (${MODEL_ID}):`, error.message);
        }
        throw new Error(errorMessage);
    }
}

/**
 * Initiates a streaming chat session with Gemini AI.
 * 
 * This function handles the complex requirements of the Gemini API, including
 * mandatory role alternating (user/model) and seeding the conversation if needed.
 * 
 * @param {string} userInput - The latest message from the user.
 * @param {Message[]} history - Existing conversation history from the session.
 * @returns {Promise<AsyncIterable<GenerateContentResponse>>} A stream of AI response chunks.
 */
export const getAiStream = async (userInput: string, history: Message[]): Promise<AsyncIterable<GenerateContentResponse>> => {
    try {
        const model = genAI.getGenerativeModel({
            model: MODEL_ID,
            systemInstruction: "You are a Senior Recruiter. Give 1-2 sentences of feedback, then ask exactly one follow-up question."
        });

        // 1. Sanitize and consolidate history (Gemini requires alternating roles: user -> model -> user)
        const chatHistory: ChatEntry[] = [];

        history.forEach(h => {
            const role = h.role === 'ai' ? 'model' : 'user';
            const text = h.content || "";

            if (chatHistory.length > 0 && chatHistory[chatHistory.length - 1].role === role) {
                // Combine consecutive messages with same role
                chatHistory[chatHistory.length - 1].parts[0].text += `\n\n${text}`;
            } else {
                chatHistory.push({
                    role,
                    parts: [{ text }]
                });
            }
        });

        // 2. Ensure history starts with 'user'
        if (chatHistory.length > 0 && chatHistory[0].role !== 'user') {
            chatHistory.unshift({
                role: 'user',
                parts: [{ text: "Start the interview." }]
            });
        }

        const chat = model.startChat({ history: chatHistory });
        const result = await chat.sendMessageStream(userInput);
        return result.stream;
    } catch (error: unknown) {
        let errorMessage = "AI Stream Error";
        if (error instanceof Error) {
            // Handle Gemini-specific error codes
            if (error.message.includes("404") || error.message.includes("not found")) {
                errorMessage = "Model not found. Please check your configuration.";
            } else if (error.message.includes("429")) {
                errorMessage = "Rate limit reached. Please try again in 1 minute.";
            }
            console.error(`AI Stream Error (${MODEL_ID}):`, error.message);
        }
        throw new Error(errorMessage);
    }
};
