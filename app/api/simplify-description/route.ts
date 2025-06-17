import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { description } = await request.json();

    // debugging
    // console.log("description from gemini", description);

    // Enhanced input validation
    if (
      !description ||
      typeof description !== "string" ||
      description.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "Valid description is required" },
        { status: 400 }
      );
    }

    // Optional: Add length limit
    // if (description.length > 5000) {
    //   return NextResponse.json(
    //     { error: "Description too long" },
    //     { status: 400 }
    //   );
    // }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Use a more current model
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash",
    });

    // const prompt = `Please simplify and summarize this Amazon product description:\n${description}`;

    const prompt = `
    Please rewrite the following Amazon product description to make it simpler, clearer, and easier to understand for everyday customers.

    Guidelines:
    - Keep key features and important benefits
    - Remove redundant marketing phrases or excessive technical jargon
    - Use a friendly and concise tone
    - Format it using plain sentences or bullet points (without using asterisks or stars)

    Here is the original description:
    ${description}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const simplifiedDescription = response.text();

    return NextResponse.json({ simplifiedDescription });
  } catch (error) {
    console.error("Error simplifying description:", error);

    // More specific error handling
    if (error instanceof Error && error.message?.includes("API key")) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Failed to simplify description" },
      { status: 500 }
    );
  }
}
