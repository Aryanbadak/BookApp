import { Router } from 'express';
import multer from 'multer';
import path, { dirname } from 'path';
import pool from '../config/db.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadDir = path.join(__dirname, '..', '..', process.env.UPLOAD_DIR || 'uploads');
if (!fs.existsSync(uploadDir))
    fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    }
});
const upload = multer({ storage });
// GET /api/books
router.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM books ORDER BY created_at DESC');
    res.json(rows);
});
// GET /api/books/:id
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [id]);
    res.json(rows[0] || null);
});
// POST /api/books
router.post('/', upload.single('cover'), async (req, res) => {
    try {
        const { title, author, year, genre } = req.body;
        const cover_path = req.file ? `/uploads/${req.file.filename}` : null;
        const [result] = await pool.query('INSERT INTO books (title, author, year, genre, cover_path) VALUES (?, ?, ?, ?, ?)', [title, author, year || null, genre || null, cover_path]);
        res.json({ id: result.insertId, title, author, year, genre, cover_path });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add book' });
    }
});
// PUT /api/books/:id
router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { title, author, year, genre } = req.body;
    let cover_path = null;
    if (req.file)
        cover_path = `/uploads/${req.file.filename}`;
    const [existingRows] = await pool.query('SELECT cover_path FROM books WHERE id = ?', [id]);
    const existing = existingRows[0];
    if (cover_path && existing && existing.cover_path) {
        const oldPath = path.join(__dirname, '..', '..', existing.cover_path);
        if (fs.existsSync(oldPath))
            fs.unlinkSync(oldPath);
    }
    await pool.query('UPDATE books SET title=?,author=?,year=?,genre=?,cover_path=COALESCE(?,cover_path) WHERE id=?', [title, author, year || null, genre || null, cover_path, id]);
    res.json({ ok: true });
});
// DELETE /api/books/:id
router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const [rows] = await pool.query('SELECT cover_path FROM books WHERE id = ?', [id]);
    const book = rows[0];
    if (book && book.cover_path) {
        const filePath = path.join(__dirname, '..', '..', book.cover_path);
        if (fs.existsSync(filePath))
            fs.unlinkSync(filePath);
    }
    await pool.query('DELETE FROM books WHERE id = ?', [id]);
    res.json({ ok: true });
});
export default router;
//# sourceMappingURL=Books.js.map