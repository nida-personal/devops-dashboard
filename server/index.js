const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const pipelines = [
  { id: 1, name: 'frontend-deploy', status: 'success', branch: 'main', duration: '2m 14s', triggered: '10 mins ago', steps: ['Build', 'Test', 'Docker', 'Deploy'] },
  { id: 2, name: 'api-service', status: 'running', branch: 'feature/auth', duration: '1m 03s', triggered: '2 mins ago', steps: ['Build', 'Test', 'Docker', 'Deploy'] },
  { id: 3, name: 'ansible-provision', status: 'failed', branch: 'infra/update', duration: '0m 45s', triggered: '25 mins ago', steps: ['Lint', 'Dry-run', 'Apply'] },
  { id: 4, name: 'db-migration', status: 'pending', branch: 'main', duration: '--', triggered: 'queued', steps: ['Validate', 'Migrate', 'Verify'] },
];

app.get('/api/pipelines', (req, res) => res.json(pipelines));
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(5000, () => console.log('Server running on port 5000'));
