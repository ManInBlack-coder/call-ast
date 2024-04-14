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
    database: 'CallAst'
})


// Sending Tasks to database
//----
app.post('/db', (req,res) => {

    const sql = 'INSERT INTO tasks (Task) VALUES(?))';
    
    const values = [req.body.text]

    db.query(sql, [values],(err,data) => {
        if(err) {
            console.log(err)
            return res.json('Error')
        }

        return res.json(data)
    })
})


app.listen(8081, ()=> {
    console.log('server working on PORT 8081')
})


// Monitoring tasks from database 
//----

