import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // Habilita CORS para evitar bloqueios
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).send('Use POST');

  try {
    const { pergunta } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "Você é um mestre pescador experiente. Responda em português." 
    });

    const result = await model.generateContent(pergunta);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ text: text }); // Garantindo que a chave seja 'text'
  } catch (error) {
    console.error(error);
    return res.status(500).json({ text: "Ocorreu um erro no servidor do mestre." });
  }
}
