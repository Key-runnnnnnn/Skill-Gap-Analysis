const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const skillGapRoutes = require('./routes/skillGapRoutes');
const roadmapRoutes = require('./routes/roadmapRoutes');
const hackerNewsRoutes = require('./routes/hackerNewsRoutes');

app.use('/api/skill-gap', skillGapRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/hackernews', hackerNewsRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Skill Gap Analysis API',
    status: 'running',
    endpoints: [
      'POST /api/skill-gap',
      'POST /api/roadmap',
      'GET /api/hackernews'
    ]
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
});
