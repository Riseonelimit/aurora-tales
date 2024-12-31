import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const schema = {
  responseMimeType: "application/json",
  responseSchema: {
    type: SchemaType.OBJECT,
    properties: {
      title: {
        type: SchemaType.STRING,
        nullable: false,
        description: "Title of the generated story",
      },
      story: {
        type: SchemaType.STRING,
        nullable: false,
        description: "Generated story",
      },
    },
  },
};

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  generationConfig: schema,
});

export const generateContent = async (prompt: string) => {
  const response = await model.generateContent(prompt);
  return response.response.text();
};
