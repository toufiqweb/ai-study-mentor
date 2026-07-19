# 🎓 AI Study Mentor — Client Frontend

[![Next.js](https://img.shields.io/badge/Next.js-16.2.10-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/-TanStack%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)](https://tanstack.com/query/latest)
[![Better-Auth](https://img.shields.io/badge/Better--Auth-1.6-red?style=for-the-badge)](https://better-auth.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

An intelligent, interactive, and personalized educational study platform built using Next.js 16 (App Router), TypeScript, and Tailwind CSS. The client provides users with interactive study plans, detailed progress tracking analytics, structured roadmap exploration, and a custom real-time AI Study Mentor chatbot.

---

## 🔗 Live Demo

🚀 **Explore the live version here:** [AI Study Mentor Deployment](https://ai-study-mentor-ten.vercel.app) \*

---

## 📋 Project Overview

**AI Study Mentor** is a full-stack platform designed to revolutionize the way students and professionals learn. Self-studying is often overwhelming due to a lack of structure and immediate guidance. This frontend client addresses these problems by providing:

1. **Interactive AI Roadmaps:** Customized paths for multiple skill levels and subjects.
2. **Context-Aware AI Mentor:** A dedicated chatbot powered by advanced LLMs that is aware of your study goals and assists you in real-time.
3. **Goal & Milestone Tracking:** Break down complex topics into atomic, trackable milestones.
4. **Visual Analytics:** Interactive dashboards showing progress over time using data visualization.

---

## ✨ Key Features

- 🔐 **Secure Session Management:** Email & Password signup/login alongside Google Social OAuth login powered by **Better-Auth**.
- 🛠️ **Next.js 16 Proxy Security:** Protected route boundary patterns using the new Next.js 16 `proxy.ts` system to safeguard private user dashboards.
- 🗺️ **Roadmap Hub:** Dynamic filters for finding roadmaps based on duration, category, difficulty, or search terms.
- 💬 **Goal-Context Chat:** Real-time chat with the AI Study Mentor where the AI understands the exact goal you are working on.
- 📊 **Progress Analytics:** Modern charts mapping completed goals, target hours, and milestone metrics.
- 🌀 **Micro-interactions:** Rich animations and transition states using **Framer Motion**.
- 📝 **Robust Validation:** Forms protected by **React Hook Form** combined with **Zod** schema validations.

---

## 🛠️ Technologies Used

- **Core Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Actions, Client Components)
- **Programming Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI & Styles:** [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/) (Icons)
- **Authentication:** [Better-Auth v1.6](https://better-auth.com/) (with MongoDB Client Adapter)
- **Animations:** [Framer Motion v12](https://www.framer.com/motion/)
- **Data Fetching & State:** [TanStack Query v5](https://tanstack.com/query/latest)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/), [Zod Schema Validation](https://zod.dev/)
- **Charts & Visuals:** [Recharts](https://recharts.org/)

---

## 🏗️ Project Architecture (Frontend)

The frontend utilizes Next.js's modern **App Router** layout. It separates layouts to optimize performance and keep code dry:

- **Common Layout (`(withCommonLayout)`)**: Contains public routes like `/about`, `/blog`, `/contact`, and `/explore-roadmaps`, wrapping them with the global public Navigation Bar and Footer.
- **Dashboard Layout (`(withDashboardLayout)`)**: Houses protected endpoints (e.g. `/dashboard`, `/dashboard/chat`) wrapped in a sticky sidebar navigation context.
- **Auth Routes (`(auth)`)**: Provides dedicated pages for `/login` and `/register`.
- **Proxy Boundary (`proxy.ts`)**: Sits directly on the server boundary to parse incoming cookies and header states, filtering out requests to `/dashboard/*` when unauthenticated.

```
┌──────────────────────────────────────────────────────────┐
│                     Next.js Client                       │
└──────────────────────────┬───────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
   [Public/Common Routes]      [Protected Dashboard]
     - Home (/), About           - Analytics, Goals
     - Explore Roadmaps          - AI Mentor Chat
             │                           │
             │             ┌─────────────┴─────────────┐
             │             ▼                           ▼
             │       (Proxy Pass)               (Proxy Redirect)
             │             │                           │
             ▼             ▼                           ▼
     [Render Content]   [Render Dashboard]      [Redirect to Login]
```

---

## 📂 Folder Structure

Below is an overview of the key directories within `client/src`:

```
src/
├── app/                        # Next.js App Router Page hierarchy
│   ├── (auth)/                 # Login, Registration layouts and pages
│   ├── (withCommonLayout)/     # Pages sharing Navbar & Footer (Public)
│   │   ├── explore-roadmaps/   # Roadmap listing page
│   │   └── page.tsx            # Main Landing page
│   ├── (withDashboardLayout)/  # Protected Pages (Dashboard, Settings, Analytics)
│   │   └── dashboard/          # Nested dashboard sub-pages
│   │       ├── chat/           # Goal-oriented AI Mentor chat screen
│   │       └── goals/          # User goals management
│   ├── api/                    # API Route Handlers (e.g. Auth catch-all)
│   ├── unauthorized/           # Forbidden redirect fallback page
│   ├── globals.css             # Tailwind v4 import & Custom tokens
│   └── layout.tsx              # Root HTML wrapper
├── components/                 # Reusable React components
│   ├── dashboard/              # Specific components for study portal dashboard
│   ├── home/                   # Components specific to the public landing page
│   ├── shared/                 # Universal shared layouts (Cards, Skeletons)
│   └── ui/                     # Tiny building blocks (Buttons, Inputs, Modals)
├── lib/                        # Core helpers, clients, and API configuration
│   ├── actions/                # Server Actions (auth, chat form submittals)
│   ├── api/                    # Client API calls targeting backend services
│   ├── core/                   # Server side auth token grabbers
│   ├── auth-client.ts          # Better-Auth browser client initialization
│   ├── auth.ts                 # Better-Auth server config & DB Adapter
│   └── constants.ts            # Configuration objects, dropdown categories
├── proxy.ts                    # Next.js 16 Server-Side Proxy router
```

---

## 📥 Installation

Follow these steps to run the frontend application locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/ai-study-mentor.git
   cd ai-study-mentor/client
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root of the `client` directory:

   ```bash
   cp .env.example .env
   ```

   _Fill in your MongoDB connection details, Better-Auth secrets, and Google credentials._

4. **Run the local development server:**

   ```bash
   npm run dev
   ```

5. **Open the browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🔒 Environment Variables (.env.example)

The frontend application requires the following environment variables to run correctly. Make sure to define these in your `.env` file:

```env
# MongoDB connection string for database adapter (Better-Auth backend store)
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>

# Secret key for better-auth (generate a secure random string)
BETTER_AUTH_SECRET=your_better_auth_secret_here

# Base URL for the frontend application (for better-auth redirection)
BETTER_AUTH_URL=http://localhost:3000

# Base URL for the external backend API
NEXT_PUBLIC_BASE_URL=http://localhost:5000

# Google Social Auth Credentials
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

---

## ⚙️ Available Scripts

Inside `package.json`, the following scripts are defined:

- `npm run dev`: Boots the development server with Next.js Turbopack.
- `npm run build`: Bundles the client production-ready packages.
- `npm run start`: Starts the Next.js application in production mode.
- `npm run lint`: Performs lint analysis on your code via ESLint.

---

## 🔑 Authentication Flow

The application's authentication architecture utilizes **Better-Auth** for secure session handling:

1. **Sign-up / Login:** Users register or log in using email credentials (validated client-side via Zod).
2. **Social OAuth (Google):** Direct social integration using Google authentication.
3. **Session Verification:** A JWT-based cookie cache strategy is maintained securely inside user headers.
4. **Token Resolution:** The backend extracts session tokens server-side using a utility called `BetterAuthToken` to retrieve details fast.

---

## 🚏 Main Pages & Routes

### Public Pages

- **`src/app/(withCommonLayout)/page.tsx`**: Landing screen with features overview, student statistics, and testimonials.
- **`src/app/(withCommonLayout)/explore-roadmaps/page.tsx`**: Catalog of standard learning roadmaps (e.g. Frontend, Backend, Machine Learning) with custom search and filtering.
- **`src/app/unauthorized/page.tsx`**: Styled landing page explaining why access was blocked, with clear login redirection prompts.

### Protected Portal

- **`src/app/(withDashboardLayout)/dashboard/page.tsx`**: Main student portal dashboard presenting ongoing goals, completed tasks, and analytics.
- **`src/app/(withDashboardLayout)/dashboard/chat/page.tsx`**: Conversation interface connecting to the AI Mentor chatbot contextually based on the user's active goal.
- **`src/app/(withDashboardLayout)/dashboard/goals/page.tsx`**: Management page for setting up roadmap milestones, adding items, and updating status.

---

## 🤖 AI Features

- **Context-Aware Study Assistant:** Unlike generic chatbots, the AI Mentor Chat targets a specific goal context. Prompt inputs automatically payload the active goal's details, making answers highly personalized.
- **Dynamic Typing Indicators:** Provides immediate visual feedback when the AI is processing study requests.
- **Roadmap Integration:** Generate, modify, and update custom milestones using intelligent LLM assistance on the backend.

---

## 📱 Responsive Design

The entire application has been built from the ground up to support modern viewing devices:

- **Mobile First Navigation:** Incorporates clean collapsible mobile drawer navigation on dashboards and responsive headers.
- **Fluid Layouts:** Flexbox and CSS Grid adapt layouts from dynamic double columns (large viewports) to stacked viewports (tablets and smartphones).
- **Responsive Charts:** The Recharts analytical components automatically auto-scale to their container boundaries.

---

## ⚡ Performance Optimizations

- **Next.js Turbopack:** Utilizes next-gen compilation assets for super fast Hot Module Replacement during development.
- **Framer Motion Optimization:** Strict CSS transitions and layout transitions using framer-motion keep browser paint overhead minimal.
- **Debounced Exploration Search:** Input fields for roadmaps filter via debounced inputs to reduce redundant API fetches.
- **Optimistic UI Updates:** Messages in the AI Mentor Chat appear immediately on user submit before the server API response completes.

---

## 🛡️ Security Considerations

- **Secure Proxies:** Protects administrative routes on the server network level using the new Next.js 16 `proxy.ts` convention, resolving access permissions BEFORE page generation.
- **Form Sanitization:** Zod schemas validate forms on the front boundary to ensure no corrupted payloads reach database interfaces.
- **Secure Token Cache:** Uses HTTPOnly cookie caching mechanism for active sessions.

---

## 🔮 Future Improvements

- [ ] **Custom AI Roadmap Generation:** Let users query the AI to create unique milestones from scratch instead of choosing existing catalog roadmaps.
- [ ] **Gamified Streaks:** Visual display of daily study accomplishments to encourage student habit building.
- [ ] **Collaborative Study Rooms:** Real-time peer learning rooms using WebSockets.

---

## 📸 Screenshots

_(Screenshots will be added upon deployment)_
| Public Home Landing | AI Mentor Chat | Student Analytics Dashboard |
|---|---|---|
| ![Landing Placeholder](public/logo.png) | ![Chat Placeholder](public/logo.png) | ![Analytics Placeholder](public/logo.png) |

---

## 👤 Author

**Your Name**

- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your Profile](https://linkedin.com/in/your-profile)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
