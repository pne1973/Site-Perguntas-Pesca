// api/chat.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { pergunta } = req.body;
    const API_KEY = process.env.GEMINI_API_KEY; // A chave será pega das variáveis da Vercel

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: "Você é um mestre pescador experiente. Responda com tutoriais práticos de pesca, dicas de equipamentos e preservação. Use português do Brasil.",
    });

    try {
        const result = await model.generateContent(pergunta);
        const response = await result.response;
        return res.status(200).json({ text: response.text() });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao processar consulta" });
    }
}
