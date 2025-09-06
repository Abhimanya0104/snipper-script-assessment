import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5050;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";
const model = genAI.getGenerativeModel({ model: modelName });

// ✅ Pricing table (Feb 2025 official)
const PRICING = {
  "gemini-1.5-flash": { inputPer1K: 0.000018, outputPer1K: 0.000036 },
  "gemini-1.5-pro": { inputPer1K: 0.00125, outputPer1K: 0.005 },
};

app.post("/api/prompt", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("➡️ Prompt received:", prompt);

    // Count input tokens with Gemini
    const inputCount = await model.countTokens({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    const inputTokens = inputCount.totalTokens;

    // Generate response
    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text();

    // Count output tokens with Gemini
    const outputCount = await model.countTokens({
      contents: [{ role: "model", parts: [{ text: aiResponse }] }],
    });
    const outputTokens = outputCount.totalTokens;

    // Pricing lookup
    const pricing = PRICING[modelName] || { inputPer1K: 0, outputPer1K: 0 };

    // Calculate costs
    const inputCost = (inputTokens / 1000) * pricing.inputPer1K;
    const outputCost = (outputTokens / 1000) * pricing.outputPer1K;
    const totalCost = inputCost + outputCost;

    res.json({
      response: aiResponse,
      inputTokens,
      outputTokens,
      totalTokens: inputTokens + outputTokens,
      cost: {
        inputCost: inputCost.toFixed(6),
        outputCost: outputCost.toFixed(6),
        totalCost: totalCost.toFixed(6),
        currency: "USD",
      },
    });
  } catch (error) {
    console.error("❌ Gemini API error:", error);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
