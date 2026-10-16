// Example Node.js Backend Proxy
const express = require('express');
const { GoogleGenAI } = require("@google/genai");
const app = express();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-exp",
    contents: prompt
  });
  res.json({ text: response.text });
});   





