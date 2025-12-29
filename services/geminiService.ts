
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message, UserProfile } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `You are 'WealthWise', a world-class strategic advisor for income generation and real-world wealth building. 
Your goal is to provide actionable, ethical, and practical advice to help users earn money in the real world.

Key focus areas:
1. Freelancing & Digital Gigs (Upwork, Fiverr, niche platforms)
2. Local Physical Opportunities (Services, arbitrage, events)
3. Passive Income Streams (Digital products, content, rentals)
4. Career Growth (Salary negotiation, skill stacking, job switching)
5. Small Business Brainstorming

Always use the 'googleSearch' tool to find real-time trends, high-paying skills, or local market data if applicable. 
When providing advice, be specific about:
- Difficulty level
- Initial time/capital investment required
- Realistic earning potential
- First 3 concrete steps to take today.

Never give financial investment advice on stocks, crypto, or gambling. Focus on earning income through value creation.`;

export async function generateHustleIdeas(profile: UserProfile): Promise<string> {
  const prompt = `Based on my profile, generate 3 diverse and realistic money-making strategies for me.
  Profile:
  - Skills: ${profile.skills.join(', ')}
  - Weekly Time: ${profile.weeklyHours} hours
  - Starting Capital: $${profile.availableCapital}
  - Location: ${profile.location}
  - Interests: ${profile.interests.join(', ')}
  
  Please search for current high-demand opportunities in ${profile.location} for 2024/2025. 
  Format the response as clear Markdown with headings.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
      },
    });
    return response.text || "I couldn't generate ideas right now. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to strategic advisor.";
  }
}

export async function chatWithWealthWise(messages: Message[], profile: UserProfile): Promise<{text: string, sources: any[]}> {
  const latestMessage = messages[messages.length - 1];
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: latestMessage.text,
      config: {
        systemInstruction: `${SYSTEM_INSTRUCTION}\n\nUser Context:\n${JSON.stringify(profile)}`,
        tools: [{ googleSearch: {} }],
      },
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.filter((chunk: any) => chunk.web)
      ?.map((chunk: any) => ({
        title: chunk.web.title,
        uri: chunk.web.uri
      })) || [];

    return {
      text: response.text || "I'm processing that. Can you rephrase?",
      sources
    };
  } catch (error) {
    console.error("Chat Error:", error);
    return { text: "Connection issues. Please try again.", sources: [] };
  }
}
