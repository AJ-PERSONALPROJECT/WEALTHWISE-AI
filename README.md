# WealthWise AI

> An intelligent AI agent that helps you identify, plan, and execute real-world money-making opportunities tailored to your skills, capital, and location.

<div align="center">

![React](https://img.shields.io/badge/React-19.2.3-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.2-blue?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

## 🎯 What is WealthWise AI?

WealthWise AI is a modern web application that leverages Google's Gemini AI to provide personalized income generation strategies. Whether you're looking for a side hustle, passive income streams, or career optimization opportunities, WealthWise analyzes your unique profile and provides actionable, real-world recommendations.

### Key Features

- 🤖 **AI-Powered Strategy Generation**: Uses Google Gemini API with real-time web search to identify current market opportunities
- 📋 **Smart Onboarding**: Collects your skills, available capital, location, and interests to personalize recommendations
- 💡 **Income Strategy Dashboard**: View curated money-making opportunities categorized by type and difficulty
- 💬 **Interactive Chat Sessions**: Engage in strategic conversations about your income goals with real-time market insights
- 🌍 **Market Pulse**: Access current market trends and opportunities in your location
- 💾 **Profile Persistence**: Your profile is saved locally for seamless return visits

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)
- A Google Gemini API key (get one at [ai.google.dev](https://ai.google.dev))

### Installation

1. **Clone the repository** (or download the project):

   ```bash
   git clone <repository-url>
   cd WEALTHWISE-AI
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up your API key**:

   Create a `.env.local` file in the root directory:

   ```env
   VITE_GEMINI_API_KEY=your-gemini-api-key-here
   ```

   > 🔑 Get your free API key from [ai.google.dev](https://ai.google.dev). No credit card required for the free tier.

4. **Start the development server**:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

## 📖 How to Use

### First Time Setup

1. **Onboarding Flow**: When you first launch the app, you'll complete a quick 4-step setup:
   - Enter your name
   - Select your skills from a curated list
   - Set your available weekly hours and starting capital
   - Choose your location and interests

2. **View Your Dashboard**: After onboarding, WealthWise generates 3 diverse income strategies tailored to your profile

### Main Features

#### 💼 Income Strategies Dashboard

The dashboard displays AI-generated, personalized money-making opportunities. Each strategy includes:
- Difficulty level (Beginner, Intermediate, Expert)
- Estimated monthly income potential
- Initial investment required
- Detailed action steps to get started

**Example**: Based on a profile with coding skills, $5,000 capital, and 15 weekly hours, you might see:
- Freelance web development projects on Upwork
- Build and sell SaaS templates passively
- Rapid skill stacking for a higher-paying job

#### 💬 Strategy Session

Engage in an interactive chat with WealthWise to:
- Ask follow-up questions about specific opportunities
- Discuss implementation challenges
- Get real-time market data for your location
- Explore niche income streams

#### 🌐 Market Pulse

Access current market trends and high-demand skills relevant to your location and interests.

## 🛠️ Project Structure

```
├── App.tsx                    # Main application component with routing
├── index.tsx                  # React entry point
├── types.ts                   # TypeScript interfaces
├── vite.config.ts             # Vite configuration
├── components/
│   ├── Dashboard.tsx          # Income strategies display
│   ├── ChatSession.tsx        # Interactive chat interface
│   ├── Onboarding.tsx         # Profile setup flow
│   └── Sidebar.tsx            # Navigation sidebar
├── services/
│   └── geminiService.ts       # Google Gemini API integration
└── package.json               # Dependencies and scripts
```

### Key Dependencies

| Package | Purpose |
|---------|---------|
| `react` & `react-dom` | UI framework |
| `@google/genai` | Google Gemini API client |
| `lucide-react` | Icon library |
| `typescript` | Type safety |
| `vite` | Build tool & dev server |

## 🔧 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_GEMINI_API_KEY` | Yes | Your Google Gemini API key |

## 🤝 Contributing

We welcome contributions! Here are some ways you can help:

- 🐛 Report bugs by opening an issue
- 💡 Suggest new features or improvements
- 📝 Improve documentation
- 🔧 Fix bugs or implement features with pull requests

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and test thoroughly
4. Commit with clear messages (`git commit -m 'Add amazing feature'`)
5. Push to your branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Code Standards

- Write TypeScript for type safety
- Use React functional components with hooks
- Follow existing component structure and naming conventions
- Test your changes locally before submitting PRs
- Keep components focused and reusable

## ❓ Getting Help

### Documentation

- **API Documentation**: See [services/geminiService.ts](services/geminiService.ts) for Gemini API integration details
- **Type Definitions**: Check [types.ts](types.ts) for data structures
- **Component Structure**: Review individual component files in [components/](components/) directory

### Support Resources

- 📚 [Google Gemini API Docs](https://ai.google.dev/docs)
- ⚛️ [React Documentation](https://react.dev)
- 🏗️ [Vite Guide](https://vitejs.dev/guide/)
- 💬 Open an issue on GitHub for questions or bugs

### Troubleshooting

**"API key error" or "Invalid API key"**
- Verify your API key is correct in `.env.local`
- Ensure the key has access to Gemini API
- Try generating a new API key from [ai.google.dev](https://ai.google.dev)

**"Port 3000 already in use"**
- The dev server will try the next available port automatically, or specify one:
  ```bash
  npm run dev -- --port 3001
  ```

**"Profile not loading"**
- Clear your browser's local storage and restart the app
- Check that JavaScript is enabled
- Try a different browser

## 👨‍💼 About

WealthWise AI is built by the AJ-PERSONALPROJECT team to democratize access to personalized wealth-building advice powered by modern AI.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Ready to find your next income opportunity?** Install WealthWise AI today and start building your wealth strategy!
