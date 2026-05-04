import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const statusColor = {
  success: '#22c55e',
  running: '#3b82f6',
  failed: '#ef4444',
  pending: '#f59e0b'
};

const statusIcon = {
  success: '✓',
  running: '⟳',
  failed: '✗',
  pending: '◷'
};

function PipelineCard({ pipeline, onSelect }) {
  return (
    <div
      className="card"
      onClick={() => onSelect(pipeline)}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-header">
        <span className="pipeline-name">{pipeline.name}</span>
        <span
          className="status-badge"
          style={{ background: statusColor[pipeline.status] }}
        >
          {statusIcon[pipeline.status]} {pipeline.status}
        </span>
      </div>

      <div className="card-meta">
        <span>🌿 {pipeline.branch}</span>
        <span>⏱ {pipeline.duration}</span>
        <span>🕒 {pipeline.triggered}</span>
      </div>

      <div className="steps">
        {pipeline.steps.map((step, i) => (
          <span
            key={i}
            className={`step ${
              i === 0 && pipeline.status === 'running' ? 'active' : ''
            }`}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [pipelines, setPipelines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedPipeline, setSelectedPipeline] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get('http://localhost:5000/api/pipelines')
        .then((r) => {
          setPipelines(r.data);
          setLoading(false);
        });
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const filtered =
    filter === 'all'
      ? pipelines
      : pipelines.filter((p) => p.status === filter);

  const counts = pipelines.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="app">
      <header>
        <div className="header-left">
          <h1>⚙ Pipeline Dashboard</h1>
          <p>CI/CD Monitor — IBM Consulting Demo</p>
        </div>

        <div className="stats">
          {Object.entries(counts).map(([s, n]) => (
            <div
              key={s}
              className="stat"
              style={{ borderColor: statusColor[s] }}
            >
              <span className="stat-num">{n}</span>
              <span className="stat-label">{s}</span>
            </div>
          ))}
        </div>
      </header>

      <div className="filters">
        {['all', 'success', 'running', 'failed', 'pending'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={filter === f ? 'active' : ''}
          >
            {f}
          </button>
        ))}
      </div>

      <main>
        {loading ? (
          <p className="loading">Fetching pipelines...</p>
        ) : (
          filtered.map((p) => (
            <PipelineCard
              key={p.id}
              pipeline={p}
              onSelect={setSelectedPipeline}
            />
          ))
        )}
      </main>

      {selectedPipeline && (
        <div className="detail-panel">
          <h2>{selectedPipeline.name} Details</h2>

          <p><b>Branch:</b> {selectedPipeline.branch}</p>
          <p><b>Status:</b> {selectedPipeline.status}</p>
          <p><b>Duration:</b> {selectedPipeline.duration}</p>

          <h3>Steps</h3>
          <ul>
            {selectedPipeline.steps.map((step, i) => (
              <li key={i}>
                {step}{' '}
                {selectedPipeline.status === 'failed' &&
                i === selectedPipeline.steps.length - 1
                  ? ' ❌'
                  : ' ✔'}
              </li>
            ))}
          </ul>

          <button onClick={() => setSelectedPipeline(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
