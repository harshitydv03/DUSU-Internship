# Project Report

## Title
DUSU Student Portal and Admin Management System

## 1. Introduction
The Delhi University Students' Union (DUSU) portal is a web-based digital platform designed to support students, faculty, and administrators by providing a unified interface for grievances, notices, events, student-help resources, team information, and administrative content management. The objective of the project is to modernize the communication flow between students and the union by offering a responsive portal with a secure admin dashboard.

The system is built using a React + Vite frontend and an Express + SQLite backend. It supports both public information pages and a protected admin panel for content updates, grievance tracking, and reply management.

## 2. Problem Statement
Traditional communication channels often lack a single, centralized, and accessible platform for student grievances and union-related information. Students may face difficulty in:

- locating updates such as notices, events, and resources,
- raising complaints or grievances in a structured manner,
- tracking the status of their requests,
- contacting the appropriate administrative office efficiently.

The DUSU portal addresses these issues by creating a digital, scalable, and user-friendly system.

## 3. Objectives
The major objectives of the project are:

1. To build a responsive website for DUSU-related information and services.
2. To create a grievance submission and tracking workflow for students.
3. To provide a secure admin interface for content moderation and query management.
4. To implement a lightweight backend using SQLite for quick deployment and low maintenance.
5. To provide a deployable project structure suitable for internship and academic presentation.

## 4. Scope of the Project
The scope of the project includes:

- Public website pages for Home, About DUSU, Student Help, Student Services, Events, Resources, Gallery, Notices, Work Milestones, and Contact.
- Student grievance form with reference ID generation.
- Query tracking system with status updates.
- Admin authentication and secure content management.
- REST API for CRUD operations on different sections of the portal.
- Data persistence through SQLite.

## 5. Project Modules

### 5.1 Frontend Module
The frontend is implemented using React and Vite. It provides the complete user-facing interface and includes components for:

- Home page
- About DUSU information pages
- Student Help section
- Contact and helpline information
- Gallery and event pages
- Resources and notices
- Admin login and dashboard

### 5.2 Backend Module
The backend is built using Express.js and handles:

- authentication,
- CRUD APIs,
- grievance submission,
- reply management,
- database interactions using SQLite.

### 5.3 Admin Dashboard
The admin panel enables authorized users to:

- log in securely,
- manage content,
- view live statistics,
- update the status of student queries,
- respond to grievances.

## 6. Technology Stack

### Frontend
- React
- Vite
- JavaScript / JSX
- CSS

### Backend
- Node.js
- Express.js
- SQLite
- JWT-based authentication

### Deployment / Dev Tools
- Docker
- Vercel-friendly frontend structure
- npm-based project management

## 7. System Architecture
The application follows a modular architecture with a separate frontend and backend.

- Frontend communicates with the backend through REST API endpoints.
- Backend exposes CRUD endpoints for resources such as notices, events, queries, team, scholarships, resources, and FAQs.
- SQLite stores portal data and supports quick local development.
- The admin panel is protected using authentication tokens.

A simple layered structure is as follows:

1. Presentation Layer: React components and pages
2. Application Layer: API client and frontend state management
3. Service Layer: Express routes and controllers
4. Data Layer: SQLite database with generic store utilities

## 8. Implementation Details

### Public Website
The public-facing portal includes dynamic pages and reusable components that present information to students in an organized manner. The layout is responsive and accessible, ensuring that the system can be used on desktops and mobile devices.

### Grievance Management
One of the key innovations of the system is the complete grievance loop:

- the student submits a query through the form,
- a unique reference ID is generated,
- the query is stored in the backend,
- the admin updates its status,
- the admin replies directly to the student,
- the student can view the progress in the tracker.

### Content Management
The admin panel provides a means to manage the content of the website without directly editing code. This significantly reduces maintenance effort and makes the portal scalable.

## 9. Challenges Faced
During the development process, several technical and organizational challenges were encountered:

- maintaining a clean separation between frontend and backend logic,
- ensuring data consistency across multiple portal sections,
- designing an admin authentication flow that remains secure and simple,
- connecting frontend components to backend endpoints,
- handling placeholder data properly while preparing the system for real content integration.

## 10. Future Enhancements
The next stage of development can include:

- real file uploads for gallery and downloads,
- migration from SQLite to a more scalable database,
- role-based admin access,
- enhanced analytics and reporting,
- more accurate DUSU official data integration.

## 11. Individual Contribution Report
Below is a proposed team contribution distribution based on the project scope and team members involved.

| Name | Proposed Role | Area of Contribution | Contribution Percentage |
|---|---|---|---:|
| Harshit Yadav | Project Lead / Full Stack Developer | Project planning, architecture coordination, frontend integration, backend workflow supervision | 14% |
| Abhinav Yadav | Frontend Developer | UI/UX design support, page component development, navigation and layout implementation | 12% |
| Anodit Pandey | Backend Developer | API design, routes, CRUD logic, database support | 12% |
| Harsh Kumar Jakhar | Frontend Developer | Student help pages, contact forms, responsive UI development | 10% |
| Ritin Sundriyal | UI/UX and Frontend Support | Reusable components, styling consistency, content page structuring | 10% |
| Simran | Content / QA Member | Testing, validation, sample content preparation, bug checking | 8% |
| Akarsh Jain | Backend / Integration Support | Database seeding, API testing, integration support | 9% |
| Antim | Admin Panel Contributor | Dashboard design, admin module support, query handling flow | 9% |
| Bhaskar Choubey | Frontend / Component Support | General page components, data binding, user interface refinement | 8% |
| Rohan Yadav | Testing / Documentation Support | Documentation writing, feature verification, deployment support | 4% |
| Samridhi Agrahari | Research / Content Support | Requirement understanding, data collection, feature documentation | 2% |
| Chirag Verma | Debugging / Quality Support | Error fixing, UI debugging, final review | 2% |

## 12. Team Contribution Summary
The project was completed through collaborative development where responsibilities were divided among frontend, backend, admin panel, testing, and documentation. The combined work resulted in a complete portal experience for public students and administrators.

A balanced team contribution is essential because the project has multiple layers:

- frontend design and user experience,
- backend data handling,
- authentication and security,
- administrative operations,
- quality assurance and documentation.

## 13. Conclusion
The DUSU Student Portal is a practical and impactful project that demonstrates the use of modern web technologies to solve a real-world communication problem. The system not only displays institutional information but also introduces an efficient grievance management workflow and a secure admin panel.

The project showcases the successful integration of frontend design, backend logic, database management, and project documentation. It is well-suited for academic evaluation, internship reporting, and future extension into a fully production-ready system.

## 14. References
- Project README
- Backend README
- Frontend README
- Project source code structure

## 15. Declaration
The team members involved in the development of this project are:

- Harshit Yadav
- Abhinav Yadav
- Anodit Pandey
- Harsh Kumar Jakhar
- Ritin Sundriyal
- Simran
- Akarsh Jain
- Antim
- Bhaskar Choubey
- Rohan Yadav
- Samridhi Agrahari
- Chirag Verma
