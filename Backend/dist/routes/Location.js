import { Router, } from 'express';
import pool from '../config/db.js';
const router = Router();
//  GET all countries
router.get("/countries", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM countries");
        res.json(rows);
    }
    catch (error) {
        console.error("Error fetching countries:", error);
        res.status(500).json({ message: "Error fetching countries" });
    }
});
// GET states by country_id
router.get("/states/:countryId", async (req, res) => {
    const { countryId } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM states WHERE country_id = ?", [countryId]);
        res.json(rows);
    }
    catch (error) {
        console.error("Error fetching states:", error);
        res.status(500).json({ message: "Error fetching states" });
    }
});
// GET cities by state_id
router.get("/cities/:stateId", async (req, res) => {
    const { stateId } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM cities WHERE state_id = ?", [stateId]);
        res.json(rows);
    }
    catch (error) {
        console.error("Error fetching cities:", error);
        res.status(500).json({ message: "Error fetching cities" });
    }
});
// ADD country
router.post("/countries", async (req, res) => {
    const { name } = req.body;
    try {
        const [result] = await pool.query("INSERT INTO countries (name) VALUES (?)", [name]);
        res.status(201).json({ message: "Country added", id: result.insertId });
    }
    catch (error) {
        console.error("Error adding country:", error);
        res.status(500).json({ message: "Error adding country" });
    }
});
// ADD state
router.post("/states", async (req, res) => {
    const { name, country_id } = req.body;
    try {
        const [result] = await pool.query("INSERT INTO states (name, country_id) VALUES (?, ?)", [name, country_id]);
        res.status(201).json({ message: "State added", id: result.insertId });
    }
    catch (error) {
        console.error("Error adding state:", error);
        res.status(500).json({ message: "Error adding state" });
    }
});
// ADD city
router.post("/cities", async (req, res) => {
    const { name, state_id } = req.body;
    try {
        const [result] = await pool.query("INSERT INTO cities (name, state_id) VALUES (?, ?)", [name, state_id]);
        res.status(201).json({ message: "City added", id: result.insertId });
    }
    catch (error) {
        console.error("Error adding city:", error);
        res.status(500).json({ message: "Error adding city" });
    }
});
export default router;
//# sourceMappingURL=Location.js.map