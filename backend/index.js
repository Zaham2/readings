// create an express server that listens to a PORT environment variable
import prisma from './lib/prisma.js';
import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
import cors from 'cors';

// require the .env file
// require('dotenv').config();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => res.send('Hello World!'));

app.get('/api', async (req, res) => {
    res.send(await prisma.rule.findMany())
})

app.get('/api/:id', async (req, res) => {
    const result = await prisma.rule.findUnique({
        where: { id: req.params?.id }
    })
    console.log(result)
    res.send(result)
})

app.post('/api', async (req, res) => {
    const result = await prisma.rule.create({
        data: {
            createdAt: new Date(),
            updatedAt: new Date(),
            name: req.body?.name,
            rawy: req.body?.rawy,
            matn: req.body?.matn,
        }
    })
    console.log(result)
    res.send(result)
})

app.put('/api/:id', async (req, res) => {
    
    // create the body of a put request that updates a rule in the prisma database

    const updated = await prisma.rule.update({
        where: { id: req.params?.id },
        data: {
            name: req.body?.name,
            rawy: req.body?.rawy,
            matn: req.body?.matn,
        }
    })
    res.send(updated)
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));    