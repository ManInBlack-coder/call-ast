const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const bodyParser = require('body-parser')
const sessions = require('express-session')


const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000','http://localhost:3001' ],
    methods: ['GET', 'POST','DELETE','PATCH'],
    credentials: true
}))


const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'CallAst'
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(sessions({
    secret: 'thisismysecretkey',
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
    resave: false
}))


app.get('/', (req, res) => {
    console.log('req.session.user', req.session.user)
    if (req.session.user) {
        res.json({ valid: true, email: req.session.user.email})
        console.log('session tootab')
    } else {
        res.send({ valid: false })
        // res.send('session unsuccesful')
    } 
})





app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()
})


// Sending Tasks to database
//----
app.post('/to_db', (req, res) => {
    const task = req.body.text; // Assuming task is the property containing the task text
    const data_to_db = 'INSERT INTO tasks (Task) VALUES (?)';
    
    db.query(data_to_db, [task], (err, data) => {
        if (err) {
            console.error('Error inserting task:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        return res.status(200).json({ message: 'Task added successfully', data: data });
    });
});


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



// LOGIN/REGISTER PART 
//-------------------------




// Register 

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Validate request data
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // Check if user with the same email already exists
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkUserQuery, [email], (err, result) => {
        if (err) {
            console.error('Error checking user:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (result.length > 0) {
            // User with the same email already exists
            return res.status(409).json({ error: 'User with this email already exists' });

        }

        // Insert new user into the database
        const insertUserQuery = 'INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)';
        db.query(insertUserQuery, [name, email, password], (err, data) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            return res.status(201).json({ message: 'User registered successfully' });
        });
    });
});







// login 

app.post('/login', (req,res) => {
    //const sql = "INSERT INTO Login ('name','email','password') VALUES(?)";
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    console.log(req.body)
    


    db.query(sql, [req.body.email, req.body.password],(err,data)=> {

        if(err) {
            console.log(err)
            return res.json('ERROR')

        }

        if(data.length > 0) {
            req.session.user = {
                email: req.body.email,
            
                
            }

            
            console.log(req.session.user)
            res.status(200).json({
                message: 'User is logged in',
                user_session: req.session.user,
                Login: true
            })
        } else {
            return res.json('failed')
        }
    })
})



app.listen(8081, ()=> {
    console.log('server working on PORT 8081')
})




