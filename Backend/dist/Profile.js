import { Router } from 'express';
import pool from '../db.js';
const router = Router();
router.post('/', async (req, res) => {
    const { full_name, email, country_id, state_id, city_id, address } = req.body;
    const [result] = await pool.query('INSERT INTO profiles (full_name,email,country_id,state_id,city_id,address) VALUES (?,?,?,?,?,?)', [full_name, email, country_id || null, state_id || null, city_id || null, address || null]);
    res.json({ id: result.insertId });
});
router.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT p.*, c.name as country, s.name as state, ci.name as city FROM profiles p LEFT JOIN countries c ON p.country_id=c.id LEFT JOIN states s ON p.state_id=s.id LEFT JOIN cities ci ON p.city_id=ci.id');
    res.json(rows);
});
export default router;
//# sourceMappingURL=Profile.js.map