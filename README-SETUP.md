# Campus Suite – Academic Management System

A responsive academic-management application built with Angular 14, Node.js, Express and MongoDB. The interface has been refreshed with a responsive navigation shell, colour-coded academic modules, live dashboard counts, student profiles with photo upload and detail view, faculty management, and reusable record-management screens.

## Included working modules

- Login and account registration with JWT authentication and role-based API access
- Responsive dashboard with live student, faculty, course and attendance totals
- Student directory: create, search, view full profile, edit, photo upload and delete (delete is administrator-only)
- Teachers / faculty: create, list, edit and delete (delete is administrator-only)
- Courses: create, list, edit and delete
- Classes and divisions; subjects; attendance; examinations; results; fees; assignments; submissions; announcements
- Mobile navigation, active navigation states, refresh actions, validation, empty states and error messages

The records modules support create/list/edit operations for administrators and teachers. Deletion is restricted to administrators by the API. Student accounts have read-only access to their own linked records where a record has a matching `userId`; announcements are visible to all authenticated roles.

## Requirements

- Node.js 16.20.2+ (Node.js LTS recommended)
- npm
- MongoDB local service or MongoDB Atlas database

## 1. Start MongoDB

Start a local MongoDB service or create a MongoDB Atlas database and copy its connection URI.

## 2. Configure and start the backend

```bash
cd Backend
npm install
```

Copy `.env.example` to `.env` and configure a private JWT secret and your database URI:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/edusphere
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=1d
CLIENT_ORIGIN=http://localhost:4200
```

Then run:

```bash
npm run dev
```

Confirm the API is running at `http://localhost:3000/api/health` and returns `{"status":"ok","service":"EduSphere API"}`.

## 3. Start the Angular frontend

Open a second terminal:

```bash
cd frontend
npm install
npm start
```

Open `http://localhost:4200`.

## 4. First login and roles

- Register the first account to create the initial administrator account.
- Later public registrations are assigned the Student role.
- To create a Teacher login account, an administrator must create/update a user in the MongoDB `users` collection with `role: "teacher"`. A teacher profile created in the Faculty screen is a staff directory record and does not itself create login credentials.
- Sign in with the account created above. All module navigation is available from the left sidebar; on mobile use the menu button.

## 5. Data workflows

- **Students:** Add student, upload a profile image (max 2 MB), search the directory, open the full details view, edit or delete.
- **Teachers & Faculty:** Maintain name, email, phone, teaching subject and qualification.
- **Courses:** Maintain course name, code, duration and description.
- **Classes:** Maintain class/division, academic year, course, room and class teacher.
- **Subjects:** Maintain subject name/code, course, semester, faculty and credits.
- **Attendance:** Record student, class, date, subject and attendance status.
- **Examinations:** Record examination name, course, semester, date, maximum marks and venue.
- **Results:** Record student, examination, subject, marks, grade and result.
- **Fees:** Track fee type, amount, paid amount, due date and payment status.
- **Assignments / Submissions:** Maintain task instructions, due dates, student submissions, links, status and marks.
- **Announcements:** Publish campus notices with audience, date and priority.

## API endpoints

Base URL: `http://localhost:3000/api`

- `POST /auth/signup` – `{ name, email, password }`
- `POST /auth/login` – `{ email, password }`
- `GET /auth/me` – authenticated current user
- `GET /{resource}` and `GET /{resource}/{id}`
- `POST /{resource}` and `PUT /{resource}/{id}` – Admin / Teacher
- `DELETE /{resource}/{id}` – Admin only

Supported resources: `students`, `teachers`, `classes`, `courses`, `subjects`, `attendance`, `examinations`, `results`, `fees`, `assignments`, `submissions`, `announcements`.

## Production readiness

This is a functional starter system, not a fully audited production SIS. Before using real student records, add institution-specific validation and data relationships, account provisioning and password reset, audit logs, database backups, HTTPS, rate limiting, privacy controls, secure file storage with malware scanning, and automated end-to-end tests. Fee records are tracking only; no payment gateway is connected. Submission file/link is a URL/text field; binary file upload is not included. The API currently returns an explicit error when MongoDB is unavailable; it does not silently store records in the browser.

## Interface walkthrough video

`Campus_Suite_Interface_Walkthrough.mp4` is a short visual preview of the refreshed dashboard and student-management screens. Names and totals shown in the video are illustrative sample data; the live application displays records returned by your configured MongoDB database.
