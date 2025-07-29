# Workcity Assessment - Backend

This is the backend API for the Workcity full-stack assessment. It handles user authentication, client/project management, and exposes RESTful endpoints built using **Node.js**, **Express.js**, and **MongoDB** with **TypeScript**.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (via Mongoose)
- TypeScript
- JWT Authentication
- CORS
- dotenv
- Jest (for testing)

---

## Folder Structure

src/
├── controllers/ # Route handlers
├── middleware/ # Auth middleware
├── models/ # Mongoose models
├── routes/ # API endpoints
├── tests/ # Jest tests
├── index.ts # Entry point

yaml
Copy
Edit

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Semight/workcity-assessment-backend.git
cd workcity-assessment-backend

2. Install Dependencies
npm install

3. Setup .env
Create a .env file in the root of your project:
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
 Make sure .env is in your .gitignore

 Scripts
Command	Action
npm run dev	Run in development mode
npm run build	Compile TypeScript to JS
npm start	Start the production server
npm test	Run tests with Jest

API Routes
 Auth
 POST /api/auth/signup
 POST /api/auth/login

Clients
 POST /api/clients
 GET /api/clients
 GET /api/clients/:id
 PUT /api/clients/:id
 DELETE /api/clients/:id

Projects
 POST /api/projects
 GET /api/projects
 GET /api/projects/:id
 PUT /api/projects/:id
 DELETE /api/projects/:id

Testing
 npm test
 Tests are located in src/tests/ folder. Sample tests for client and project endpoints are provided.

Deployment
 You can deploy this backend using platforms like:
 Render
 Railway
 Vercel (Serverless)

Make sure to set the MONGO_URI and JWT_SECRET in your platform’s environment settings.

Author
 David Irefin – @Semight

License
 This project is part of the Workcity assessment and intended for demonstration purposes only.

---