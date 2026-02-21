import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { registerSocketHandlers } from './socket';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_URL || '*' }
});

app.use(express.json());

// Log the current directory for debugging
console.log('Current directory:', __dirname);
console.log('Looking for frontend dist at:', path.join(__dirname, '../../frontend/dist'));

// Serve static files from the frontend dist directory
const frontendDistPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendDistPath));

// Handle all other routes by serving the frontend's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

registerSocketHandlers(io);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend static path: ${frontendDistPath}`);
  
  // Check if the frontend dist directory exists
  const fs = require('fs');
  if (fs.existsSync(frontendDistPath)) {
    console.log('✅ Frontend dist directory exists');
    console.log('Contents:', fs.readdirSync(frontendDistPath));
  } else {
    console.log('❌ Frontend dist directory does NOT exist!');
  }
});