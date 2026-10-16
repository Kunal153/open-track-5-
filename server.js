require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-2.0-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

app.post("/ask", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ error: "Prompt cannot be empty." });
  }

  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || "Gemini API error." });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
    res.json({ result: text });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

app.listen(3000, () => console.log("✅ Running at http://localhost:3000"));
