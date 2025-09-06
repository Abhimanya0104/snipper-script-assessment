

```markdown
# 💬 AI Token Counter App

A full-stack application that integrates with **Google Gemini API** to provide AI-powered responses while accurately tracking:

- Input tokens (from user prompts)  
- Output tokens (from AI responses)  
- Real-time cost estimation (based on Gemini per-token pricing)  
- Conversation history with detailed token & cost breakdown  

---

## ✨ Features
- Professional **ChatGPT-like UI** built with React + Vite  
- Backend powered by **Node.js + Express**  
- Uses **Gemini API** for AI responses  
- Tokenization with [`gpt-tokenizer`](https://www.npmjs.com/package/gpt-tokenizer)  
- Cost calculation **handled only by backend** with real Gemini pricing  
- Conversation history showing:
  - Input Tokens, Output Tokens  
  - Input Cost, Output Cost, Total Cost  

---

## 📂 Project Structure
```

token-counter-app/
├── backend/
│   ├── server.js        # Express backend with Gemini + tokenizer + pricing
│   ├── package.json
│   └── .env             # API key, model, port
│
└── frontend/
├── src/
│   ├── App.jsx      # React frontend logic
│   ├── App.css      # Styling (ChatGPT-like UI)
│   └── main.jsx
├── package.json
└── public/

````

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/token-counter-app.git
cd token-counter-app
````

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash
PORT=5050
```

Run the backend:

```bash
npm start
```

Backend will run at **[http://localhost:5050](http://localhost:5050)**

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend will run at **[http://localhost:5173](http://localhost:5173)**

---

## 🧪 Usage

1. Open **[http://localhost:5173](http://localhost:5173)**
2. Enter a prompt (e.g., `Explain blockchain in simple terms`)
3. Press **Send**
4. You’ll see:

   * AI’s response
   * Input Tokens, Output Tokens
   * Input Cost, Output Cost, Total Cost
5. Previous prompts/responses appear in history

---

## 📊 Example Response

```json
{
  "response": "Blockchain is a decentralized digital ledger...",
  "inputTokens": 72,
  "outputTokens": 210,
  "inputCost": 0.0000252,
  "outputCost": 0.0001470,
  "totalCost": 0.0001722
}
```

---

## 💰 Gemini Pricing

By default, this app uses **Gemini 1.5 Flash**:

* Input: **\$0.00035 / 1K tokens**
* Output: **\$0.00070 / 1K tokens**

You can switch to **Gemini 1.5 Pro** in `.env`:

```env
GEMINI_MODEL=gemini-1.5-pro
```

Pricing automatically updates in backend calculations.

---

## 🔮 Future Enhancements

* Multi-model support (Gemini Pro, OpenAI GPT-4, Claude, etc.)
* User authentication & usage tracking
* Export conversation history
* Admin dashboard for cost monitoring
* Docker deployment

---

## 📜 License

MIT License © 2025 Your Name

```

---

Would you like me to also **add screenshots section with placeholders** (like `![screenshot](docs/screenshot.png)`) so the company sees a polished README with visuals too?
```
