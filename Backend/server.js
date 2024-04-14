const express = require('express');
const mysql = require('mysql');
const cors = require('cors')


const app = express();
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
}))

app.use(express.json())

const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    //database: 'signup',   
    database: 'Log_In'
})

app.listen(8081, ()=> {
    console.log('server working on PORT 8081')
})