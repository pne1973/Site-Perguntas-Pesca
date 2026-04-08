import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ text: "Use POST" });

  try {
    const { pergunta } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
        return res.status(500).json({ text: "Erro: A chave API_KEY não foi encontrada nas variáveis da Vercel." });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(pergunta);
    const response = await result.response;
    
    return res.status(200).json({ text: response.text() });
  } catch (error) {
    // Isso vai mostrar o erro real do Google na sua tela
    return res.status(500).json({ text: "Erro real: " + error.message });
  }
}
