import prisma from './lib/prisma.js';
import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
import rulesRoutes from './routes/rulesApi.js';
import comparisonsRoutes from './routes/comparisonsApi.js';
import matnRoutes from './routes/matnRoutes.js';
import cors from 'cors';

// require the .env file
// require('dotenv').config();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/api/rule', rulesRoutes);
app.use('/api/comparison', comparisonsRoutes);
app.use('/api/matn', matnRoutes)
// app.use('/api/comparison', import('./routes/comparisonsApi'));
// app.get('/', async (req, res) => res.send('Hello World!'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));    