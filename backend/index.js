// create an express server that listens to a PORT environment variable
const prisma = require('./lib/prisma')
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// require the .env file
require('dotenv').config();

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api', (req, res) => {
    

})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));    