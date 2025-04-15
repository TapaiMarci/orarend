import express from 'express';
import orarendRoutes from './routes/orarendRoutes.js';
import cors from 'cors';
import path from 'path'; // Új import

const app = express();
const port = 3000;

// Statikus fájlok kiszolgálása
app.use(express.static('public')); // A 'public' mappából szolgáljuk ki a statikus fájlokat
app.use(express.json());
app.use(cors());

app.use('/api', orarendRoutes);

app.listen(port, () => {
  console.log(`Server runs on port ${port}`);
});
