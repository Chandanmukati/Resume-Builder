# AI Resume Builder 🤖📄

An AI-powered resume builder with live preview, ATS scoring, job description matching, and smart templates.

## ✨ Features

- 🤖 **AI-Enhanced Writing** — Auto-generate professional bullet points & summaries using OpenAI
- 📊 **ATS Score** — Analyze your resume's compatibility with Applicant Tracking Systems
- 🎯 **Job Description Matching** — Paste any JD and get match score + missing keywords
- 🎨 **3 Resume Templates** — Modern, Classic, and Minimal designs
- 💬 **AI Chat Assistant** — Ask anything about improving your resume
- 📥 **PDF Export** — Download your resume as a print-ready PDF
- 💾 **Save to Database** — Persist your resumes to MongoDB

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| AI | OpenAI GPT-3.5 (with local fallback) |
| PDF | html2pdf.js |

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- OpenAI API Key *(optional — app works without it)*

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/ai-resume-builder.git
cd ai-resume-builder
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-resume-builder
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
```

Start the backend:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
ai-resume-builder/
├── backend/
│   ├── config/db.js          # MongoDB connection
│   ├── controllers/          # Route handlers
│   ├── middleware/           # Error handling
│   ├── models/Resume.js      # Resume schema
│   ├── routes/               # API routes
│   ├── services/aiService.js # OpenAI + fallback logic
│   └── server.js             # Express entry point
│
└── frontend/
    └── src/
        ├── components/       # Reusable UI components
        │   └── templates/    # Resume template designs
        ├── context/          # React Context (global state)
        ├── pages/            # Home, Builder, Templates
        └── services/api.js   # Axios API calls
```

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Backend server port | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `OPENAI_API_KEY` | OpenAI API key | No (fallback available) |

> **Note:** The app works without an OpenAI API key using built-in fallback logic for demos.

## 📸 Screenshots

> Add screenshots here after deployment.

## 📄 License

MIT License — feel free to use and modify.

---

Built with ❤️ by [Chandan Mukati](https://github.com/Chandanmukati)
