# Requirements Document

## Introduction

This feature migrates Johnny Tran's existing static HTML/CSS/JS portfolio website into a modern full-stack application. The frontend will be rebuilt using React (Vite), Tailwind CSS, Framer Motion, and React Router. The backend will be a Node.js/Express API serving structured data for projects, profile, and resume content. The existing pages (Home, About, Projects/Games, Resume) will be preserved and enhanced with a clean component architecture, client-side routing, subtle animations, and a responsive UI.

## Glossary

- **App**: The full-stack portfolio application composed of the Frontend and Backend.
- **Frontend**: The React (Vite) single-page application served to the browser.
- **Backend**: The Node.js/Express REST API server.
- **Router**: The React Router instance managing client-side navigation.
- **API**: The Backend's HTTP interface exposing profile, projects, and resume data.
- **ProfileData**: A structured JSON object containing the owner's name, tagline, bio, contact links, and skills.
- **ProjectData**: A structured JSON object representing a single project with title, description, tech stack, links, and an optional image.
- **ResumeData**: A structured JSON object containing experience entries, education entries, and skills.
- **NavBar**: The persistent top navigation component rendered on every page.
- **Page**: A top-level React component mapped to a route (Home, About, Projects, Resume).
- **AnimatedPage**: A wrapper component that applies Framer Motion entry/exit transitions to a Page.
- **DataStore**: The in-memory or file-based data layer on the Backend that holds ProfileData, ProjectData[], and ResumeData.

---

## Requirements

### Requirement 1: Client-Side Routing

**User Story:** As a visitor, I want to navigate between Home, About, Projects, and Resume pages without full page reloads, so that the experience feels fast and app-like.

#### Acceptance Criteria

1. THE Router SHALL define four routes: `/` (Home), `/about` (About), `/projects` (Projects), `/resume` (Resume).
2. WHEN a visitor navigates to a route, THE Frontend SHALL render the corresponding Page component without a full browser reload.
3. WHEN a visitor navigates to an undefined route, THE Frontend SHALL render a 404 Not Found Page.
4. THE NavBar SHALL render a navigation link for each of the four primary routes.
5. WHEN a NavBar link matches the current route, THE NavBar SHALL apply an active visual indicator to that link.

---

### Requirement 2: Persistent Navigation

**User Story:** As a visitor, I want a consistent navigation bar on every page, so that I can move between sections at any time.

#### Acceptance Criteria

1. THE NavBar SHALL be rendered on every Page within the App.
2. THE NavBar SHALL display the owner's name or logo as a home link pointing to `/`.
3. WHILE the viewport width is below 768px, THE NavBar SHALL collapse navigation links into a hamburger menu toggle.
4. WHEN the hamburger menu toggle is activated, THE NavBar SHALL expand to display all navigation links.
5. WHEN a navigation link is selected on mobile, THE NavBar SHALL collapse the expanded menu.

---

### Requirement 3: Home Page

**User Story:** As a visitor, I want a welcoming landing page that introduces the developer, so that I immediately understand who this portfolio belongs to and what they do.

#### Acceptance Criteria

1. WHEN the visitor navigates to `/`, THE Frontend SHALL render the Home Page displaying the owner's name and tagline sourced from ProfileData.
2. THE Home Page SHALL display a brief introduction paragraph sourced from ProfileData.
3. THE Home Page SHALL display call-to-action links navigating to `/projects` and `/resume`.
4. WHEN the Home Page mounts, THE AnimatedPage SHALL apply a fade-in entry transition with a duration no greater than 400ms.

---

### Requirement 4: About Page

**User Story:** As a visitor, I want to learn more about the developer's background and interests, so that I can understand their personality and motivations.

#### Acceptance Criteria

1. WHEN the visitor navigates to `/about`, THE Frontend SHALL render the About Page displaying the bio sourced from ProfileData.
2. THE About Page SHALL display the owner's skills as a list of tags sourced from ProfileData.
3. THE About Page SHALL display contact links (email, GitHub) sourced from ProfileData.
4. WHEN the About Page mounts, THE AnimatedPage SHALL apply a fade-in entry transition with a duration no greater than 400ms.

---

### Requirement 5: Projects Page

**User Story:** As a visitor, I want to browse the developer's projects and games, so that I can evaluate their work and interests.

#### Acceptance Criteria

1. WHEN the visitor navigates to `/projects`, THE Frontend SHALL fetch ProjectData[] from the API endpoint `GET /api/projects`.
2. WHEN ProjectData[] is loading, THE Frontend SHALL display a loading indicator.
3. WHEN ProjectData[] is successfully fetched, THE Frontend SHALL render a card for each ProjectData entry.
4. WHEN a project card is rendered, THE Frontend SHALL display the project's title, description, tech stack tags, and optional image.
5. IF the API request to `GET /api/projects` fails, THEN THE Frontend SHALL display a user-readable error message.
6. WHEN the Projects Page mounts, THE AnimatedPage SHALL apply a fade-in entry transition with a duration no greater than 400ms.
7. WHEN project cards are rendered, THE Frontend SHALL stagger their entry animations with a delay of no more than 100ms between each card.

---

### Requirement 6: Resume Page

**User Story:** As a visitor, I want to view the developer's resume including experience, education, and skills, so that I can assess their qualifications.

#### Acceptance Criteria

1. WHEN the visitor navigates to `/resume`, THE Frontend SHALL fetch ResumeData from the API endpoint `GET /api/resume`.
2. WHEN ResumeData is loading, THE Frontend SHALL display a loading indicator.
3. WHEN ResumeData is successfully fetched, THE Frontend SHALL render experience entries, education entries, and skills sourced from ResumeData.
4. IF the API request to `GET /api/resume` fails, THEN THE Frontend SHALL display a user-readable error message.
5. THE Resume Page SHALL display a downloadable link or button for a PDF resume file.
6. WHEN the Resume Page mounts, THE AnimatedPage SHALL apply a fade-in entry transition with a duration no greater than 400ms.

---

### Requirement 7: Backend API — Profile Endpoint

**User Story:** As the Frontend, I want to retrieve profile data from the Backend, so that personal information is managed in one place and not hardcoded in the UI.

#### Acceptance Criteria

1. THE API SHALL expose a `GET /api/profile` endpoint.
2. WHEN `GET /api/profile` is called, THE API SHALL respond with a JSON body conforming to the ProfileData schema with HTTP status 200.
3. THE ProfileData schema SHALL include: `name` (string), `tagline` (string), `bio` (string), `skills` (string[]), `contact.email` (string), `contact.github` (string).
4. IF an internal error occurs, THEN THE API SHALL respond with HTTP status 500 and a JSON error message.

---

### Requirement 8: Backend API — Projects Endpoint

**User Story:** As the Frontend, I want to retrieve the list of projects from the Backend, so that project data can be updated without redeploying the Frontend.

#### Acceptance Criteria

1. THE API SHALL expose a `GET /api/projects` endpoint.
2. WHEN `GET /api/projects` is called, THE API SHALL respond with a JSON array of ProjectData objects with HTTP status 200.
3. EACH ProjectData object SHALL include: `id` (string), `title` (string), `description` (string), `techStack` (string[]), `repoUrl` (string or null), `liveUrl` (string or null), `imageUrl` (string or null).
4. IF an internal error occurs, THEN THE API SHALL respond with HTTP status 500 and a JSON error message.

---

### Requirement 9: Backend API — Resume Endpoint

**User Story:** As the Frontend, I want to retrieve resume data from the Backend, so that resume content is centrally managed and easy to update.

#### Acceptance Criteria

1. THE API SHALL expose a `GET /api/resume` endpoint.
2. WHEN `GET /api/resume` is called, THE API SHALL respond with a JSON body conforming to the ResumeData schema with HTTP status 200.
3. THE ResumeData schema SHALL include: `experience` (array of `{ title, company, period, description }`), `education` (array of `{ degree, institution, period }`), `skills` (string[]).
4. IF an internal error occurs, THEN THE API SHALL respond with HTTP status 500 and a JSON error message.

---

### Requirement 10: Responsive Layout

**User Story:** As a visitor on any device, I want the portfolio to display correctly on mobile, tablet, and desktop screens, so that I have a consistent experience regardless of device.

#### Acceptance Criteria

1. THE Frontend SHALL use Tailwind CSS responsive utility classes to adapt layouts across breakpoints: mobile (< 768px), tablet (768px–1023px), and desktop (≥ 1024px).
2. WHILE the viewport width is below 768px, THE Frontend SHALL render single-column layouts for all Pages.
3. WHILE the viewport width is 768px or above, THE Frontend SHALL render multi-column layouts where appropriate (e.g., project cards grid).
4. THE Frontend SHALL not produce horizontal scroll at any standard viewport width from 320px to 1920px.

---

### Requirement 11: Animation Strategy

**User Story:** As a visitor, I want subtle, non-distracting animations that enhance the feel of the site, so that the UI feels polished without being overwhelming.

#### Acceptance Criteria

1. THE AnimatedPage SHALL apply entry animations using Framer Motion with opacity transitioning from 0 to 1 and a y-offset transitioning from 16px to 0px.
2. THE Frontend SHALL not apply looping or continuous animations to any element that does not require user interaction.
3. WHEN a user has enabled the `prefers-reduced-motion` media query, THE AnimatedPage SHALL disable all motion transitions and render content immediately.
4. THE Frontend SHALL limit Framer Motion usage to page transitions and card entry animations only.

---

### Requirement 12: Frontend Project Structure

**User Story:** As a developer maintaining this project, I want a clean and predictable folder structure, so that I can locate and modify any part of the codebase quickly.

#### Acceptance Criteria

1. THE Frontend SHALL organize source files under a `client/src/` directory with subdirectories: `pages/`, `components/`, `hooks/`, `api/`, and `assets/`.
2. THE Frontend SHALL isolate all API fetch logic inside the `client/src/api/` directory, with one module per resource (`profile.js`, `projects.js`, `resume.js`).
3. THE Frontend SHALL define reusable UI components (NavBar, ProjectCard, SkillTag, LoadingSpinner, AnimatedPage) inside `client/src/components/`.
4. THE Backend SHALL organize source files under a `server/` directory with subdirectories: `routes/`, `data/`, and an entry point `index.js`.

---

### Requirement 13: Data Seeding

**User Story:** As a developer, I want the Backend to ship with seed data reflecting the existing portfolio content, so that the app is functional immediately after setup.

#### Acceptance Criteria

1. THE DataStore SHALL be pre-populated with ProfileData matching the existing portfolio owner (name: "Johnny Tran", tagline: "Aspiring Web & Games Developer").
2. THE DataStore SHALL be pre-populated with at least one ProjectData entry representing the existing games/hobby section content.
3. THE DataStore SHALL be pre-populated with ResumeData matching the existing experience and skills from the static site.
4. THE DataStore SHALL be implemented as a static JSON file or in-memory JS module within `server/data/` requiring no external database for initial setup.
