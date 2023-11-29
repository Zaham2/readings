// create an express server that listens to a PORT environment variable
const prisma = require('./lib/prisma')
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

// require the .env file
require('dotenv').config();

app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api', async (req, res) => {
    const result = await prisma.rule.findMany()
    console.log(result)
    res.send(result)

})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));    