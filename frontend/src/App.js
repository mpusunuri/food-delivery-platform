import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [backendStatus, setBackendStatus] = useState('Checking...');
  const [dbStatus, setDbStatus] = useState('Checking...');

  useEffect(() => {
    // Check backend health
    fetch('http://localhost:5000/health')
      .then(res => res.json())
      .then(data => setBackendStatus(`✅ ${data.status}`))
      .catch(() => setBackendStatus('❌ Backend not reachable'));

    // Check database connection
    fetch('http://localhost:5000/db-test')
      .then(res => res.json())
      .then(data => setDbStatus(`✅ ${data.db_status}`))
      .catch(() => setDbStatus('❌ DB not reachable'));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🍔 Food Delivery Platform</h1>
        <div style={{ textAlign: 'left', padding: '20px', background: '#282c34', borderRadius: '10px' }}>
          <p><strong>Backend:</strong> {backendStatus}</p>
          <p><strong>Database:</strong> {dbStatus}</p>
        </div>
        <p style={{ marginTop: '40px', fontSize: '14px', color: '#aaa' }}>
          🚀 Running in Docker containers!
        </p>
      </header>
    </div>
  );
}

export default App;