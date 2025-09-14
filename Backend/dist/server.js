import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import booksRouter from './routes/Books.js';
import profileRouter from './routes/Profile.js';
import locationsRouter from './routes/Location.js';
import path from 'path';
import pool from './config/db.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// static for uploaded images
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/api/books', booksRouter);
app.use('/api/profile', profileRouter);
app.use('/api/locations', locationsRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
pool.getConnection().then(conn => {
    console.log('Database connected');
    conn.release();
}).catch(err => {
    console.error('Database connection failed:', err);
});
export default app;
//# sourceMappingURL=server.js.map