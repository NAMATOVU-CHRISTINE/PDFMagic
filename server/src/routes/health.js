import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'PDF Tools API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

export default router;
