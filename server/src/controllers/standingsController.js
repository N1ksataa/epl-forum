import { Router } from 'express';
import { getStandings } from '../services/standingsService.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const standings = await getStandings();
        res.json(standings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve ranking.' });
    }
});

export default router;
