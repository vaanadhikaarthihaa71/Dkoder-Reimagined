# DKODER — Complete Frontend Redesign
> **The Placement LMS for Engineering Colleges Across India**  
> Built with **React 19**, **TypeScript**, **Tailwind CSS**, and **Vite**.

Reference website: [https://dkoder.co.in/](https://dkoder.co.in/)

---

## 🎨 Theme & Design System (Yellow & Purple)

The entire platform is styled using a distinctive, premium **Yellow and Purple** color identity tailored for high-energy engineering hackathons and placement preparation:

- **Primary Accent (`#FACC15` / `#EAB308`):** Sunshine Yellow for primary action buttons, active states, highlights, streak badges, and focus outlines.
- **Secondary Brand (`#581C87` / `#3B0764` / `#7E22CE`):** Royal Purple for navigation elements, deep contrast typography, card headers, and dark surfaces.
- **Backgrounds:** Soft lavender (`#FAF8FF`), warm off-white, and clean white cards (`#FFFFFF`) with subtle lavender borders (`#E9D5FF`).
- **Typography:** Deep near-black purple (`#1E1B4B`) set in **Plus Jakarta Sans** with **JetBrains Mono** for code blocks.
- **Micro-Interactions & Animations:** Float animations for the robotic mascot, seamless infinite recruiter marquee, interactive task completion with `canvas-confetti`, and interactive compiler simulators.

---

## 🚀 Live Demo & Development

To run the platform locally:

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build for production
npm run build
```

The application will run locally at `http://127.0.0.1:5173/`.

---

## 📦 Implemented Component Inventory

### 1. Global Navigation & Layout
- **Navbar ([`src/components/common/Navbar.tsx`](src/components/common/Navbar.tsx)):**
  - Brand typography and yellow/purple monogram logo.
  - Interactive "Learn & Tracks" dropdown with direct bundle navigation.
  - Links to Hackathons, For Colleges, and Apply for MOU.
  - User status popover with 14-day streak badge, XP counter, and profile links.
  - Prominent "Go to Dashboard" yellow CTA button.
  - Fully functional responsive mobile drawer with hamburger toggle.
- **Footer ([`src/components/common/Footer.tsx`](src/components/common/Footer.tsx)):**
  - Verified credentials and standards ticker.
  - 4 Link Groups: For Students, For Institutions, Programmes, Help & Support.
  - Verified corporate office address: `Campus 1A, No. 143, Dr. M.G.R. Road, Perungudi, Chennai 600096, Tamil Nadu, India`.
  - Official contact channels: `support@dkoder.co.in` and WhatsApp/Phone `+91 87542 00247`.
  - Social media and legal links.

### 2. Homepage Hero & Brand Experience
- **HeroSection ([`src/components/home/HeroSection.tsx`](src/components/home/HeroSection.tsx)):**
  - High-impact headline communicating DKODER's placement LMS mission.
  - Supporting copy grounded in real platform value.
  - Primary, secondary, and tertiary CTAs.
  - Vector SVG yellow robotic mascot with animated expressions and floating code chips.
  - Interactive conversational speech bubbles showing real student queries (TCS Digital, InfyTQ, Super Dream) with curated placement insights.
  - Real student avatar social proof (+15k active students).

### 3. Recruiter Logo Marquee
- **RecruiterMarquee ([`src/components/home/RecruiterMarquee.tsx`](src/components/home/RecruiterMarquee.tsx)):**
  - Infinite horizontally scrolling marquee with verified company names and roles (TCS, Infosys, Accenture, Microsoft, Amazon, Google, Wipro, Cognizant, HCL, Adobe).
  - Reduced-motion accessibility support and hover pause.

### 4. Student Anxiety Ticker & Tag Cloud
- **AnxietyTicker ([`src/components/home/AnxietyTicker.tsx`](src/components/home/AnxietyTicker.tsx)):**
  - Interactive pill cards addressing high-pressure interview preparation questions:
    - *"What should I revise tonight?"*
    - *"Where should I begin?"*
    - *"How do I prepare for coding rounds?"*
    - *"Which topics should I practise first?"*
    - *"How do I improve my interview confidence?"*
    - *"How to balance semester exams with placement prep?"*
  - Expandable modal dialog featuring step-by-step checklists, strategic summaries, and pro tips.

### 5. Dynamic Target Filter Toolbar
- **FilterToolbar ([`src/components/home/FilterToolbar.tsx`](src/components/home/FilterToolbar.tsx)):**
  - Company selector (TCS, Infosys, Accenture, Microsoft, Amazon, Google, etc.).
  - Salary package range selector (< 4 LPA, 4-7 LPA, 7-12 LPA, 12-20 LPA, 20+ LPA Super Dream).
  - Mode selector (All, Core Coding, Aptitude, MCQ & Tech, System Design).
  - Difficulty level selector (All, Easy, Medium, Hard).
  - Live search input.
  - Reset Filters button.
  - **"Surprise Me"** button that picks a random question and opens the live coding lab.
  - Live match counter.

### 6. Question Stream & Live In-Browser Coding Lab
- **QuestionStream ([`src/components/home/QuestionStream.tsx`](src/components/home/QuestionStream.tsx)):**
  - Cards with topic tags (Nested Structures, Matrix Operations, Memoisation, Sliding Window, Graph BFS, Two Pointers, SQL Aggregates), format tags (Coding, MCQ), and difficulty badges.
  - Estimated solving times and participant counts.
  - Sorting by relevance, time, and popularity.
- **CodingLabModal ([`src/components/home/CodingLabModal.tsx`](src/components/home/CodingLabModal.tsx)):**
  - Live in-browser compiler simulation for Python, Java, and C++.
  - Run Sample Tests button with console output.
  - Submit Solution button with 18 hidden test cases evaluation and XP rewards.
  - Interactive radio selector and explanation for MCQ questions.

### 7. Career Track Breakdown Cards
- **CareerTracks ([`src/components/home/CareerTracks.tsx`](src/components/home/CareerTracks.tsx)):**
  - Service-Company Developer (3.5 - 7.5 LPA).
  - Big Tech Software Engineer (18.0 - 45.0 LPA).
  - Product-Company SDE (10.0 - 24.0 LPA).
  - Visual MCQ vs Coding distribution bar.
  - Real local progress tracking linked to solved questions.
  - Direct links to `/bundles/infosys` and `/bundles/accenture`.

### 8. Campus Leaderboard Dashboard
- **Leaderboard ([`src/components/home/Leaderboard.tsx`](src/components/home/Leaderboard.tsx)):**
  - Top 3 podium with gold crown, silver, and bronze badges.
  - Search input for student or college name.
  - Partner institution dropdown filter.
  - Tabs for XP Leaders, Most Active Solvers, and Hard Solvers.
  - Responsive ranking table with streak days, progress bars, and XP.

### 9. Pricing & Subscription Grid
- **PricingGrid ([`src/components/home/PricingGrid.tsx`](src/components/home/PricingGrid.tsx)):**
  - 5 authentic tiers:
    - **Bronze:** ₹699/year (~₹2/day)
    - **Silver:** ₹999/year (~₹3/day)
    - **Gold:** ₹1,599/year (~₹5/day)
    - **Platinum:** ₹1,999/year (~₹6/day) — *Most Popular*
    - **Super Dream Pack:** ₹2,999/year (~₹9/day) — *Best Value*
  - Interactive checkout preview modal with coupon code `CAMPUS2026`.
  - Links to `/student/subscription` and `/partner-mou`.

### 10. Interactive Daily Path Checklist
- **DailyPath ([`src/components/home/DailyPath.tsx`](src/components/home/DailyPath.tsx)):**
  - 4 daily micro-habits checklist.
  - Interactive checkboxes with persistent `localStorage` synchronization.
  - Completion counter and progress bar.
  - "Complete Next Task" automated action.
  - Full celebratory confetti explosion (`canvas-confetti`) upon 4/4 completion.

### 11. Institutional Analytics Banner
- **InstitutionalBanner ([`src/components/home/InstitutionalBanner.tsx`](src/components/home/InstitutionalBanner.tsx)):**
  - TnP placement cell dashboard preview.
  - 4 Metric cards: Batch Participation (94.2%), Test Completion (88.5%), Topic Coverage (96.0%), Placement Readiness (81.4%).
  - Cohort switcher (All Engineering, CSE & IT, ECE & Circuit) and qualification distribution.
  - Direct links to `/colleges` and `/partner-mou`.

### 12. Complete Route Architecture
- `/`: Homepage with all core sections.
- `/hackathons`: Inter-collegiate coding contests hub with team registration modal.
- `/colleges`: Institutional LMS features, comparison matrix, and demo scheduling modal.
- `/partner-mou`: Comprehensive 10-field MOU application form with downloadable docket slip.
- `/dashboard`: Student telemetry, readiness index, streak, enrolled tracks, and submissions history.
- `/student/subscription`: 5-plan comparison table, annual/semester toggle, and checkout dialog.
- `/bundles/infosys`: InfyTQ & Specialist Programmer syllabus, roles (3.6 - 9.5 LPA), and mock drills.
- `/bundles/accenture`: Cognitive & Technical assessment stages and ASE/FSE salary details.

---

## 🛡️ Data Integrity Note
All corporate details (addresses, pricing tiers, recruiter tags, and syllabus breakdowns) reflect verified information from [https://dkoder.co.in/](https://dkoder.co.in/). All interactive rankings, mock students, and test results are clearly identified as illustrative frontend demo data.
