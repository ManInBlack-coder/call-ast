const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
app.use(cors({
    origin: ['http://localhost:3000','http://localhost:3001' ],
    methods: ['GET', 'POST'],
    credentials: true
}))



    const db = mysql.createConnection({

        host: 'localhost',
        user: 'root',
        password: 'qwerty',
        //database: 'signup',   
        database: 'CallAst'
    })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



// Sending Tasks to database
//----
app.post('/db', (req,res) => {

    const data_to_db = 'INSERT INTO tasks (Task) VALUES(?))';
    
    const values = [req.body.text]

    db.query(data_to_db, [values],(err,data) => {
        if(err) {
            console.log(err)
            return res.json('Error')
        }

        return res.json(data)
    })
})


// Monitoring tasks from database 
//----

app.get('/db', (req,res) => {

    const data_to_mon = 'SELECT Task from tasks';
    
    db.query(data_to_mon,(err,data)=> {
        if(err) {
            console.log(err)
            return res.json('errooour')
        }
        return res.json({todos: data})
    })

})

app.listen(8081, ()=> {
    console.log('server working on PORT 8081')
})




