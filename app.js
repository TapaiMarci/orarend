import express from 'express';
import orarendRoutes from './routes/orarendRoutes.js';
import cors from 'cors';
import path from 'path'; t

const app = express();
const port = 3000;

app.use(express.static('public')); 
app.use(express.json());
app.use(cors());

app.use('/api', orarendRoutes);

app.listen(port, () => {
  console.log(`Server runs on port ${port}`);
});
