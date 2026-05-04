# DevOps Pipeline Dashboard

A full-stack CI/CD monitoring dashboard built with **React** (frontend) and **Node.js/Express** (backend).

## Tech Stack
- **Frontend**: React, Axios — port 3000
- **Backend**: Node.js, Express — port 5000
- **Concepts**: REST API, CORS, CI/CD pipeline visualization, Ansible/DevOps workflows

## Run Locally

```bash
# Backend
cd server && npm install && node index.js

# Frontend (new terminal)
cd client && npm install && npm start
```

## Features
- Live pipeline status (success / running / failed / pending)
- Filter by status
- Stats summary header
- Simulates Ansible, Docker, deploy stages
