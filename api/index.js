const express = require('express');
const path = require('path');


const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '../dist/store/browser'), {
  maxAge: '1y',
  index: false
}));

// Handle all routes - fallback to index.html for SPA routing
app.get('*', (req, res) => {
  console.log('Request:', req.url);
  
  // For now, just serve index.html and let Angular Router handle routing
  // This is a simple SPA approach that should work reliably
  res.sendFile(path.join(__dirname, '../dist/store/browser/index.html'));
});

module.exports = app;