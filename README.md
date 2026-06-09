# SPRO App Frontend

SPRO App Frontend is a modern web application built with Next.js (App Router), designed for tracking and managing sales performance, reports, and outlet coverage metrics. It features a responsive layout with dynamic charts and structured data presentation.

## 🔗 Links & Demo Access

- **GitHub Repository:** [Nur-Alam-PRG-Dev/spro-app-frontend](https://github.com/Nur-Alam-PRG-Dev/spro-app-frontend)
- **Live Demo:** [https://spro-app-frontend.vercel.app/](https://spro-app-frontend.vercel.app/)

**Demo Credentials:**
- **Staff ID:** `224446`
- **Password:** `87654321`

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [DaisyUI v5](https://daisyui.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Charts & Data Visualization:** [Recharts](https://recharts.org/)
- **Linting:** ESLint

## 🌟 Core Features & Architecture

- **Performance Tracking & Reports:** Detailed pages (`/amolnama`, `/halfSummary`, `/reports`) to calculate and display complex sales data, targets, and achievements.
- **API Integration:** Built-in Next.js App Router API Routes (`src/app/api`) handling backend communication seamlessly.
- **Recharts Integration:** Advanced, interactive data visualization utilizing `<ResponsiveContainer>`, `<BarChart>`, `<PieChart>`, etc., giving dynamic insights into sales metrics.
- **Rendering Strategies (SSG & CSR):** Employs hybrid rendering. Server-Side Rendering / Static Generation (SSG) for performance-critical pages, alongside Client-Side Rendering (CSR) for real-time dashboard interactions.
- **Client-Side Calculations:** Implements robust client-side math and state derivations to instantly update summary metrics and charts without unnecessary server round-trips.

## 📁 Project Structure

The project is structured under the `src` directory using Next.js App Router conventions:

- **`src/app/`**: Contains all the application routes and layouts.
  - `/` - Main Dashboard
  - `/login` - Authentication page
  - `/amolnama` - Detailed metrics page
  - `/halfSummary` - Half-summary overview
  - `/reports` - Comprehensive data reports
  - `/targetVsAchievement` - Performance comparison metrics
  - `/uncoveredOutlet` - Uncovered outlet tracking
  - `/api` - API route handlers
- **`src/components/`**: Reusable React components organized by features (e.g., Dashboard, Sidebar, Navbar, Reports, Mobile UI).
- **`src/dummyData/`**: Local JSON files (`halfSummary.json`, `targetVsAchievement.json`, `uncoveredOutlets.json`, `webReport.json`) used for testing and mock data rendering.

## 🛠️ Getting Started

### Prerequisites

Make sure you have Node.js (version 18+ recommended) and `npm` installed.

### Installation

1. Clone the repository and navigate to the project folder:
   ```bash
   cd spro-app-frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the application in development mode:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page will automatically reload if you make edits.

### Building for Production

To create an optimized production build, run:

```bash
npm run build
```

And to start the production server:

```bash
npm run start
```

## 🎨 UI/UX Features

- Fully responsive design targeting both desktop and mobile platforms.
- Interactive and dynamic charts using Recharts for target comparisons and performance tracking.
- Pre-styled, customizable UI components utilizing DaisyUI and Tailwind CSS.
- Sleek and lightweight icons provided by Lucide React.
