import { Router } from 'express';
import pool from '../db.js';
const router = Router();
router.get('/countries', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM countries');
    res.json(rows);
});
router.get('/states/:countryId', async (req, res) => {
    const countryId = Number(req.params.countryId);
    const [rows] = await pool.query('SELECT * FROM states WHERE country_id=?', [countryId]);
    res.json(rows);
});
router.get('/cities/:stateId', async (req, res) => {
    const stateId = Number(req.params.stateId);
    const [rows] = await pool.query('SELECT * FROM cities WHERE state_id=?', [stateId]);
    res.json(rows);
});
export default router;
//# sourceMappingURL=Location.js.map