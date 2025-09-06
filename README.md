
# AI Token Counter Application

This project is a full-stack application that integrates with the Google Gemini API to analyze prompts, count tokens, and estimate costs based on actual per-token pricing. It provides a professional interface similar to modern AI chat systems, with clear tracking of token usage and costs for each interaction.

---

## Features

- User enters prompts through a React-based frontend.
- Backend service (Node.js/Express) sends prompts to the Gemini API.
- Token counts are computed using a tokenizer library.
- Input tokens, output tokens, and costs are calculated on the backend.
- Cost breakdown includes input cost, output cost, and total cost.
- Chat-style interface displays:
  - User prompts
  - AI responses
  - Token usage
  - Cost estimation
- History of all interactions is maintained.

---

## Technology Stack

- Frontend: React (Vite), CSS
- Backend: Node.js, Express
- Tokenizer: gpt-tokenizer
- AI Model: Google Gemini (default: gemini-1.5-flash)

## Setup Instructions

### 1. Clone the repository
```

git clone [https://github.com/your-username/token-counter-app.git](https://github.com/your-username/token-counter-app.git)
cd token-counter-app

```

### 2. Backend setup
```

cd backend
npm install

```

Create a `.env` file in the backend directory:

Environment configuration:  
A `.env` file is already provided in this project containing a working API key.  
For now, you can use this existing `.env` file directly without creating a new one. 
```

GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash
PORT=5050

```

Start the backend:
```

npm start

```

The backend will run at:
```

[http://localhost:5050](http://localhost:5050)

```

### 3. Frontend setup
```

cd ../frontend/vite-project
npm install
npm run dev

```

The frontend will run at:
```

[http://localhost:5173](http://localhost:5173)

```

---

## Usage

1. Open the frontend in your browser.
2. Enter a prompt in the text input and click Send.
3. The backend processes the request by:
   - Counting input tokens
   - Sending the prompt to the Gemini API
   - Receiving the AI response
   - Counting output tokens
   - Calculating input cost, output cost, and total cost
4. Results are displayed in the UI along with the conversation history.

---

## Example API Response

```

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

## Pricing

Default model: Gemini 1.5 Flash  
- Input: $0.00035 per 1,000 tokens  
- Output: $0.00070 per 1,000 tokens  

To use Gemini 1.5 Pro, update `.env`:
```

GEMINI_MODEL=gemini-1.5-pro

```

The backend automatically applies the correct pricing.

---

