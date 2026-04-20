require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router/userRouter');
const app = express();
const {PORT, SERVER} = process.env

app.use(express.json());
app.use(cors());
app.use('/api', router);

app.get('/', (req, res) => res.send("initializing server was successfull!!"))
app.get('/api', (req, res) => res.send("change the routes to access data keywords are: userdata"))

app.listen(PORT, () => console.log(`server is running: ${SERVER}`))