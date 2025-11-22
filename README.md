# Skill Gap Analysis & Career Roadmap Platform

**Full Stack Developer Assignment – CodeAtRandom AI**

A full-stack web application that helps users analyze their skill gaps, generate personalized career roadmaps, and stay updated with the latest tech news from HackerNews.

---

## ⚡ Quick Start (5 Minutes)

```bash
# 1. Clone the repository
git clone https://github.com/Key-runnnnnnn/Skill-Gap-Analysis
cd "Skill Gap Analysis"

# 2. Setup Backend
cd backend
npm install
echo "PORT=5000\nGEMINI_API_KEY=your_key_here\nNODE_ENV=development" > .env
npm run dev

# 3. Setup Frontend (in new terminal)
cd frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local
npm run dev

# 4. Open browser
# Visit: http://localhost:3000
```

**Get Gemini API Key**: [Google AI Studio](https://aistudio.google.com/app/apikey) (Free)

---

## 📋 Assignment Features Implemented

### 1. Career Goal Input Page ✅

- Simple form with target role dropdown (7 roles available)
- Multi-select skill picker with 100+ common tech skills
- Custom skill input capability
- "Analyze My Career Path" button
- Real-time skill selection display

### 2. Skill Gap Analyzer API ✅

**Endpoint**: `POST /api/skill-gap`

- Matches user's current skills against role requirements
- Uses predefined JSON with 7 career roles
- Returns:
  - Matched skills list
  - Missing skills list
  - Match percentage & readiness level
  - AI-powered recommendations (Gemini 2.5 Flash)
  - Suggested learning order (foundational → intermediate → advanced)
- All logic implemented in backend (not frontend)

### 3. Career Roadmap Generator API ✅

**Endpoint**: `POST /api/roadmap`

- Returns 3-phase structured roadmap based on target role
- Each phase includes:
  - Title & duration estimate
  - Required skills to learn
  - Project suggestions
  - Optional AI-personalized tips
- Total duration calculation across all phases

### 4. Public API Integration (HackerNews) ✅

**Endpoint**: `GET /api/hackernews`

- Fetches top 5 latest tech stories from HackerNews API
- Uses: `https://hacker-news.firebaseio.com/v0/topstories.json`
- Fetches details: `https://hacker-news.firebaseio.com/v0/item/<id>.json`
- Displays:
  - Title
  - URL
  - Score
  - Time
  - Type
  - By (author)
  - Descendants (comments count)

### 5. Combined Dashboard Page ✅

- **Left Side**: Skill Gap Analysis results with statistics
- **Right Side**: 3-Phase Career Roadmap
- **Bottom Section**: Latest 5 Tech News from HackerNews
- Layout: Responsive grid, clean minimal design
- Loading states and error handling
- "Start Over" button to reset


## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 16.0.3 (App Router)
- **UI Library**: React 19.2.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Fetch API
- **State Management**: React Hooks + SessionStorage

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Language**: JavaScript (CommonJS)
- **AI Integration**: Google Generative AI SDK v0.24.1 (Gemini 2.5 Flash)
- **HTTP Client**: Axios 1.13.2
- **Environment**: dotenv 17.2.3
- **Dev Tools**: Nodemon 3.1.11

### External APIs

- **Custom REST APIs**: Skill Gap Analysis, Career Roadmap Generator
- **HackerNews API**: Public API (no key required)
- **Google Gemini AI**: For intelligent recommendations

### Database/Storage

- **JSON Files**: In-memory data storage (bonus feature)
- `skillsData.json`: 7 roles with 10+ skills each
- `roadmapsData.json`: 3-phase roadmaps for all roles
- `userInputs.json`: Optional user analysis history

## 📁 Project Structure

```
Skill Gap Analysis/
├── README.md                      # This file
│
├── frontend/                      # Next.js Frontend
│   ├── app/
│   │   ├── page.tsx              # Main input page (Feature #1)
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Results dashboard (Feature #5)
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── lib/
│   │   ├── api.ts                # API client functions
│   │   ├── types.ts              # TypeScript interfaces
│   │   └── constants.ts          # Roles & skills constants
│   ├── public/                   # Static assets
│   ├── .env.local                # Frontend environment variables
│   ├── package.json              # Frontend dependencies
│   ├── next.config.ts            # Next.js configuration
│   └── tsconfig.json             # TypeScript configuration
│
└── backend/                       # Express.js Backend
    ├── controllers/
    │   ├── skillGapController.js      # Feature #2 logic
    │   ├── roadmapController.js       # Feature #3 logic
    │   └── hackerNewsController.js    # Feature #4 logic
    ├── routes/
    │   ├── skillGapRoutes.js          # POST /api/skill-gap
    │   ├── roadmapRoutes.js           # POST /api/roadmap
    │   └── hackerNewsRoutes.js        # GET /api/hackernews
    ├── utils/
    │   ├── geminiHelper.js            # AI integration helper
    │   ├── skillMatcher.js            # Skill matching algorithms
    │   └── fileStorage.js             # JSON file storage (bonus)
    ├── data/
    │   ├── skillsData.json            # 7 roles with skills
    │   ├── roadmapsData.json          # 3-phase roadmaps
    │   └── userInputs.json            # User analysis history
    ├── server.js                      # Express app entry point
    ├── .env                           # Backend environment variables
    └── package.json                   # Backend dependencies
```

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** 18+ installed ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Gemini API Key** (Free from [Google AI Studio](https://aistudio.google.com/app/apikey))

---

### 🔧 Backend Setup

1. **Navigate to backend folder**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   This installs:

   - `express` - Web framework
   - `cors` - Cross-origin requests
   - `dotenv` - Environment variables
   - `axios` - HTTP client
   - `@google/generative-ai` - Gemini AI SDK
   - `nodemon` - Auto-reload (dev)

3. **Create environment file**

   ```bash
   # Create .env file in backend folder
   touch .env
   ```

   Add the following:

   ```env
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key_here
   NODE_ENV=development
   ```

   > **Get API Key**: Visit [Google AI Studio](https://aistudio.google.com/app/apikey), sign in, and create a free API key

4. **Start the backend server**

   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # OR Production mode
   npm start
   ```

   ✅ **Backend running at**: `http://localhost:5000`

   You should see:

   ```
   🚀 Server running on port 5000
   📡 API available at http://localhost:5000
   ```

---

### 🎨 Frontend Setup

1. **Navigate to frontend folder**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   This installs:

   - `next` - React framework
   - `react` & `react-dom` - UI library
   - `typescript` - Type safety
   - `tailwindcss` - Styling
   - `axios` - HTTP client

3. **Create environment file**

   ```bash
   # Create .env.local file in frontend folder
   touch .env.local
   ```

   Add the following:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

   > For production, replace with your deployed backend URL

4. **Start the frontend server**

   ```bash
   # Development mode
   npm run dev

   # OR Production mode
   npm run build
   npm start
   ```

   ✅ **Frontend running at**: `http://localhost:3000`

   You should see:

   ```
   ✓ Ready in 2s
   ○ Local: http://localhost:3000
   ```

---

### ✅ Verify Setup

1. **Check Backend Health**

   ```bash
   curl http://localhost:5000
   ```

   Should return API status

2. **Open Frontend**
   Visit: `http://localhost:3000`
3. **Test Complete Flow**
   - Select a target role (e.g., "Backend Developer")
   - Choose current skills (e.g., "Java", "Git")
   - Click "Analyze My Career Path"
   - View results dashboard with skill gap, roadmap, and news

## 📡 API Endpoints

### 1. Skill Gap Analyzer (Feature #2)

**Endpoint**: `POST /api/skill-gap`

Analyzes user's current skills against target role requirements.

**Request Body:**

```json
{
  "targetRole": "Backend Developer",
  "currentSkills": ["Java", "Git", "SQL"]
}
```

**Response (200 OK):**

```json
{
  "targetRole": "Backend Developer",
  "analysis": {
    "matchedSkills": ["Java", "SQL", "Git"],
    "missingSkills": [
      "Spring Boot",
      "APIs",
      "Database Design",
      "RESTful Services",
      "Authentication",
      "Microservices",
      "Docker"
    ],
    "statistics": {
      "totalRequired": 10,
      "matched": 3,
      "missing": 7,
      "matchPercentage": 30,
      "readinessLevel": "Beginner"
    },
    "learningOrder": [
      "Spring Boot",
      "APIs",
      "RESTful Services",
      "Database Design",
      "Authentication",
      "Microservices",
      "Docker"
    ],
    "recommendations": {
      "text": "To become a Backend Developer, prioritize mastering Spring Boot and RESTful Services as they build on your Java foundation. Focus on hands-on projects that integrate databases and authentication. Stay consistent with daily practice and you'll bridge this gap effectively.",
      "source": "gemini-ai"
    }
  },
  "timestamp": "2025-11-22T10:30:00.000Z"
}
```

**Error Responses:**

- `400 Bad Request` - Missing targetRole or currentSkills
- `404 Not Found` - Target role not available
- `500 Internal Server Error` - Server error

---

### 2. Career Roadmap Generator (Feature #3)

**Endpoint**: `POST /api/roadmap`

Generates a 3-phase learning roadmap for target role.

**Request Body:**

```json
{
  "targetRole": "Frontend Developer",
  "currentSkills": ["HTML", "CSS", "JavaScript"]
}
```

**Response (200 OK):**

```json
{
  "targetRole": "Frontend Developer",
  "roadmap": {
    "phase1": {
      "title": "Foundation Phase",
      "duration": "1-2 months",
      "skills": [
        "HTML",
        "CSS",
        "JavaScript Basics",
        "Git",
        "Responsive Design"
      ],
      "projects": ["Personal Portfolio", "Landing Page", "Form Validation"],
      "aiTip": "Master HTML and CSS fundamentals before diving into frameworks.",
      "order": 1
    },
    "phase2": {
      "title": "Framework Mastery",
      "duration": "2-3 months",
      "skills": [
        "React",
        "TypeScript",
        "State Management",
        "REST APIs",
        "Tailwind CSS"
      ],
      "projects": ["Todo App", "Weather Dashboard", "E-commerce Frontend"],
      "aiTip": "Build multiple React projects to solidify component-based thinking.",
      "order": 2
    },
    "phase3": {
      "title": "Advanced & Production",
      "duration": "1-2 months",
      "skills": ["Next.js", "Testing", "Performance", "Deployment", "CI/CD"],
      "projects": ["Blog with CMS", "Full-Stack App", "Portfolio with Backend"],
      "aiTip": "Focus on deployment and optimization for production-ready skills.",
      "order": 3
    }
  },
  "totalDuration": "4-7 months",
  "personalizedTips": true,
  "timestamp": "2025-11-22T10:30:00.000Z"
}
```

**Note**: `aiTip` is optional and only included if AI enhancement succeeds.

---

### 3. HackerNews Integration (Feature #4)

**Endpoint**: `GET /api/hackernews`

Fetches top 5 latest tech stories from HackerNews.

**Request**: No body required

**Response (200 OK):**

```json
{
  "count": 5,
  "stories": [
    {
      "id": 46011978,
      "title": "Show HN: I built a tool for developers",
      "url": "https://example.com/article",
      "score": 245,
      "by": "username",
      "time": "2025-11-22T08:15:30.000Z",
      "type": "story",
      "descendants": 87
    },
    ...4 more stories
  ],
  "timestamp": "2025-11-22T10:30:00.000Z",
  "source": "HackerNews API"
}
```

**Fields Explained:**

- `id` - Story ID
- `title` - Story title
- `url` - Article link
- `score` - Upvotes count
- `by` - Author username
- `time` - Published timestamp (ISO 8601)
- `type` - Content type (story, job, etc.)
- `descendants` - Comment count

---

### Health Check Endpoint

**Endpoint**: `GET /`

Check if backend server is running.

**Response:**

```json
{
  "message": "Skill Gap Analysis API",
  "status": "running",
  "endpoints": [
    "POST /api/skill-gap",
    "POST /api/roadmap",
    "GET /api/hackernews"
  ]
}
```

---

## 📊 Available Career Roles

The application supports 7 major tech career paths with predefined skill requirements:

| Role                          | Required Skills Count | Sample Skills                                                            |
| ----------------------------- | --------------------- | ------------------------------------------------------------------------ |
| **Frontend Developer**        | 10                    | HTML, CSS, JavaScript, React, Git, TypeScript, REST APIs                 |
| **Backend Developer**         | 10                    | Java, Spring Boot, SQL, APIs, Git, Microservices, Docker                 |
| **Full Stack Developer**      | 12                    | HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, SQL             |
| **Data Analyst**              | 10                    | Excel, SQL, Python, Dashboards, Statistics, Power BI, Tableau            |
| **DevOps Engineer**           | 10                    | Linux, Docker, Kubernetes, CI/CD, Git, Cloud Platforms, Terraform        |
| **Mobile Developer**          | 10                    | React Native, JavaScript, TypeScript, Mobile UI/UX, REST APIs            |
| **Machine Learning Engineer** | 10                    | Python, Machine Learning, TensorFlow, PyTorch, Statistics, Deep Learning |


