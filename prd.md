# 🗓️ 3-Day Task Plan — Next.js Website Wireframe & Structure  
**Project:** Soteria Learning — Next.js Site Wireframe & Mapping  
**Objective:** Create a structured, modular, and conversion-optimized layout for Soteria Learning’s website with localized, engaging, and accessible design.

---

## 🔹 Day 1 — Information Architecture & Core Layout Setup

### **Goals**
- Define Next.js page structure, routing, and shared components.
- Implement consistent header, footer, and layout wrappers.
- Set up responsive grid and card components using TailwindCSS.

### **Tasks**
1. **Initialize Next.js Project**
   - Setup with TypeScript, TailwindCSS, ESLint, and Prettier.
   - Create `/pages` and `/components` directories.
   - Install dependencies:
     ```bash
     npm install next@latest react react-dom tailwindcss @headlessui/react framer-motion lucide-react firebase
     ```
   - Configure global styles and typography.

2. **Core Layout Components**
   - `/components/Layout.tsx`: Global layout with header, footer, and `<main>`.
   - `/components/Header.tsx`:  
     - Logo (top-left), Nav links (Solutions, Services, Process, Case Studies, Insights, Contact), and language toggle.
   - `/components/Footer.tsx`:  
     - Contact info, privacy links, certifications, mini sitemap, social icons.

3. **Routing & Page Setup**
   - Create Next.js routes:
     ```
     /               → Home
     /solutions      → Solutions (Dynamic per audience)
     /services       → Services Hub
     /services/[id]  → Service Detail
     /process        → Process Page
     /case-studies   → Case Studies
     /insights       → Insights
     /contact        → Contact / Start a Project
     ```

4. **Wireframe Base Components**
   - `/components/Hero.tsx`: Headline, subtext, CTAs.
   - `/components/TrustBar.tsx`: Greyed client logos.
   - `/components/SectionTitle.tsx`: For reuse across all sections.
   - `/components/CardGrid.tsx`: Modular grid for services/outcomes/testimonials.

5. **Design System Tokens**
   - Define Tailwind theme for color palette, spacing, typography.
   - Establish `primary`, `secondary`, and `accent` color hierarchy.

---

## 🔹 Day 2 — Page Wireframes & Dynamic Content Components

### **Goals**
- Build static/dynamic content structure for each page type.
- Implement reusable sections and carousels for modular UX.
- Apply iconography and interaction patterns.

### **Tasks**

#### **1. Home Page**
- **Hero Section:** Bold headline, localized subtext, “Book a Discovery Call” and “Start Scoping Your Project” CTAs.
- **What We Do:** Three-column service summary (Course Dev, Multimedia, Localization).
- **Outcomes Snapshot:** Metrics tiles — Engagement Lift, Accessibility Rate, On-Time Delivery.
- **Featured Case Study:** Pull-quote, before/after metrics.
- **Process Preview:** “Our 8-Step Delivery” horizontal icon flow.
- **Social Proof:** Testimonial carousel + compliance badges.
- **Footer CTA Band:** Quick contact call-to-action.

#### **2. Solutions Page**
- Dynamic route for audience types (e.g. `/solutions/lms-admins`).
- Includes:
  - Persona headline & description.
  - “Problems We Solve” checklist.
  - Benefits summary.
  - Carousel/tiles of relevant services.
  - Case study teaser.
  - CTA: “Request Proposal”.

#### **3. Services Hub**
- Grid of service tiles:
  - Course Development
  - Multimedia & Video
  - Localization & Accessibility
  - SME Collaboration
  - AI-driven Consulting
- Each tile links to `/services/[id]`.
- Reuse `CardGrid` + `Icon` components.

---

## 🔹 Day 3 — Detail Pages, Content Logic & Enhancements

### **Goals**
- Finalize service detail, process, and insights templates.
- Build dynamic data structure for case studies, FAQs, and forms.
- Integrate animations and CTAs.

### **Tasks**

#### **1. Service Detail Page (`/services/[id]`)**
- **Hero Banner:** Service name & tagline.
- **Left Sidebar:** Links to other services.
- **Core Content:**
  - Steps overview (How it works)
  - Deliverables grid (sample thumbnails)
  - Timeline visualization
  - LMS integration info
- **Testimonial Block**
- **Final CTA:** “Book Consultation”

#### **2. Process Page**
- Banner: “Our Process”
- 8-step flow with icons & brief labels:
  - Brief → Design → Storyboard → Alpha → Beta → Gold → Localize → Launch
- Include expedited timeline callout.

#### **3. Case Studies Page**
- Grid/list of stories with:
  - Thumbnail, summary, “Read More”.
  - Filters (industry, language, service type).
  - Outcome metrics (engagement, accessibility, delivery).
- Card component for each story.

#### **4. Insights Page**
- Blog list layout with metadata.
- Featured/gated content download section.
- Highlight themes:
  - AI in Education
  - Localization Wins
  - Accessibility in Learning

#### **5. Contact / Start a Project**
- Intro block + contact form:
  - Fields: Name, Email, Org, Project Goals, Audience, Languages, Budget, Timeline, Accessibility needs.
- Secondary CTA: Embedded calendar (e.g., Calendly iframe).
- Sidebar: “Your data is safe with us” + 24h response note.

---

## ⚙️ Functional Requirements Mapping

| Feature Category           | Description                                                                 |
|-----------------------------|------------------------------------------------------------------------------|
| **E-Learning Development**  | Custom courses, multimedia, gamification, mobile-first learning             |
| **E-Learning Outsourcing**  | Project management, scalable teams, long-term support                      |
| **Online Course Development** | Video learning, assessments, LMS integration                              |
| **Content Localization**    | Translation, voiceover, compliance, QA                                     |
| **Instructional Design**    | Needs analysis, storyboarding, learner-centric design                      |
| **Instructional Design Academy (IDA)** | Training, workshops, tech integration, portfolio mentoring, certification |

---

## 👥 User Story Integration

| Persona | User Goals |
|----------|-------------|
| **LMS Administrators** | Source SCORM-compliant content, smooth integration, project visibility |
| **Corporate Organizations** | Custom workforce training, localization, measurable ROI |
| **Educational Organizations** | Digitize content, improve accessibility, stay current with tech |
| **Training Institutions** | Multilingual rapid course production, SME collaboration, branded certification |

---

## ✅ Deliverables

- [ ] Next.js app initialized and deployed (Vercel staging)
- [ ] Modular components for layout, cards, and CTAs
- [ ] Fully wired page routes and responsive wireframes
- [ ] Placeholder content for all page templates
- [ ] Ready for design and content population phase

---

**Next Step (Post-Wireframe Phase):**
- Replace placeholders with real copy and assets.
- Add analytics & performance tracking.
- Implement localization (Next.js i18n) and accessibility audit.

---
**Output:**  
📁 `/wireframes/soteria-nextjs-structure.md`
