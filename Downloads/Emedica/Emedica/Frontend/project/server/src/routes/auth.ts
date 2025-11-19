import { Router } from 'express';

const router = Router();

// Example: POST /api/auth/login
router.post('/login', (req, res) => {
  res.json({ message: 'Login endpoint' });
});

export default router;
