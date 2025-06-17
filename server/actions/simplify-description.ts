import { GoogleGenerativeAI } from "@google/generative-ai";

export async function simplifyDescription(description: string) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Please simplify and summarize the following product description in a clear, concise way. Keep the key features and benefits but make it more readable. Here's the description:

${description}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error simplifying description:", error);
    throw new Error("Failed to simplify description");
  }
}
