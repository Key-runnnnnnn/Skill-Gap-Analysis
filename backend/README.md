# Backend - Skill Gap Analysis API

Backend API server for the Skill Gap Analysis platform.

## 🚀 Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

Server runs on: \`http://localhost:5000\`

## 📡 API Endpoints

- \`POST /api/skill-gap\` - Analyze skill gaps
- \`POST /api/roadmap\` - Generate career roadmap
- \`GET /api/hackernews\` - Fetch top tech news

## 🔑 Environment Variables

Create a \`.env\` file:
\`\`\`
PORT=5000
GEMINI_API_KEY=your_api_key_here
NODE_ENV=development
\`\`\`

## 🧪 Testing

\`\`\`bash
node test-skill-gap.js
node test-roadmap.js
node test-hackernews.js
\`\`\`

## 📦 Dependencies

- express - Web framework
- cors - Cross-origin requests
- dotenv - Environment variables
- axios - HTTP client
- @google/generative-ai - Gemini AI SDK

## 🏗️ Structure

\`\`\`
backend/
├── controllers/ # Request handlers
├── routes/ # Route definitions
├── utils/ # Helper functions
├── data/ # JSON databases
└── server.js # Express app
\`\`\`
