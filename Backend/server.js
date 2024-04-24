const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
app.use(cors({
    origin: ['http://localhost:3000','http://localhost:3001' ],
    methods: ['GET', 'POST','DELETE'],
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
app.post('/to_db', (req,res) => {

    const data_to_db = 'INSERT INTO tasks (Task) VALUES(?))';
    
    const values = req.body.text

    db.query(data_to_db, values,(err,data) => {
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

    const data_to_mon = 'SELECT Task,Task_id from tasks';
    
    db.query(data_to_mon,(err,data)=> {
        if(err) {
            console.log(err)
            return res.json('errooour')
        }
        return res.json({todos: data})
    })

})


// Deleting tasks data in database 
//----


app.delete('/delete/todo/:id', (req, res) => {
    const del = `DELETE FROM tasks WHERE Task_id=${req.params.id}`;
    
    db.query(del, (err, result) => {
        if (err) {
            console.error('Error deleting todo:', err);
            return res.status(500).json({ error: 'An error occurred while deleting todo' });
        }
        
        console.log('Todo deleted successfully');
        return res.status(200).json({ message: 'Todo deleted successfully' });
    });
});



app.listen(8081, ()=> {
    console.log('server working on PORT 8081')
})




