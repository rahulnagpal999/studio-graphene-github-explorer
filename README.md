# GitHub Explorer

## Project Title & Brief Description

**Exercise Chosen:** GitHub Repository Explorer (Full Stack)

GitHub Explorer is a full-stack web application that allows users to search GitHub profiles, view repository information, analyze programming language usage, and explore developer activity. The application integrates with the GitHub API through a custom Express backend and presents data through a responsive React-based frontend. The project was developed as part of the Studio Graphene Associate Software Engineer assessment.

---

## Live Demo Links

### Frontend (Vercel)

https://studio-graphene-github-explorer.vercel.app/

### Backend (Render)

https://github-explorer-backend-uvn8.onrender.com/

### GitHub Repository

https://github.com/rahulnagpal999/studio-graphene-github-explorer

---

## Tech Stack

### Frontend

* React.js — Component-based UI development
* Vite — Fast development server and build tooling
* Tailwind CSS — Utility-first responsive styling
* Axios — HTTP client for API communication
* Recharts — Language distribution visualizations
* Lucide React — Modern icon library

### Backend

* Node.js — JavaScript runtime environment
* Express.js — REST API framework
* Axios — GitHub API requests
* Node Cache — In-memory response caching
* CORS — Cross-origin request handling

### Deployment

* Vercel — Frontend hosting
* Render — Backend hosting

---

## How to Run Locally

### Clone Repository

```bash
git clone https://github.com/rahulnagpal999/studio-graphene-github-explorer.git

cd studio-graphene-github-explorer
```

### Start Backend

```bash
cd backend

npm install

npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

### Start Frontend

Open a second terminal:

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## API Documentation

### Get GitHub User Details

Method:

```http
GET
```

Path:

```http
/api/github/users/:username
```

Example:

```http
/api/github/users/torvalds
```

Response:

```json
{
  "success": true,
  "data": {
    "profile": {},
    "repositories": []
  }
}
```

Error Response:

```json
{
  "success": false,
  "error": "User not found"
}
```

---

## Project Structure

```text
studio-graphene-github-explorer
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── services
│   ├── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── Charts
│   │   │   ├── Profile
│   │   │   ├── Repository
│   │   │   └── Search
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── README.md
```

---

## Features

* GitHub user search
* Repository explorer
* Language usage analytics
* Recent search history
* Loading states
* Error handling
* Responsive design
* Backend caching
* Mobile-friendly UI
* Live deployment

---

## Next Steps

Given additional time, I would implement:

* Repository sorting and filtering
* Pagination for large result sets
* GitHub contribution activity charts
* Automated testing (Jest / React Testing Library)
* GitHub OAuth authentication
* Redis-based distributed caching
* Dark/Light theme toggle
* Accessibility improvements

---

## Author

Rahul Nagpal

GitHub:
https://github.com/rahulnagpal999

Email:
nagpalrahul987@gmail.com
