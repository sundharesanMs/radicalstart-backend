const express = require('express')
const mysql = require("mysql");
const cors = require('cors'); 
const app = express();
app.use(express.json());
app.use(cors()); 

//Establish the database connection

const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "dbsmschool",

});

db.connect(function (error) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      console.log("successfully Connected to DB");
    }
  });

//Establish the Port

  app.listen(8000,function check(error) {
    if (error) 
    {
    console.log("Error....dddd!!!!");
    }

    else 
    {
        console.log("Started....!!!! 8000");

    }
});
app.get('/', (req, res)=>{
  const sql = "select * from users";
  db.query(sql, (err, result)=>{
    if(err){
      return res.json({message: 'error'})
    }
    return res.json(result); 
  }) 
});

app.post("/student", (req, res) => {
  let sql = "INSERT INTO users (`name`, `email`) VALUES (?)";
  let details = [
    req.body.name, 
    req.body.email
  ];
  console.log(details);

  // Execute the query
  db.query(sql, [details], (error, result) => {
    if (error) {
      
      return res.status(500).json({ error: error.message });
    }
   
    return res.status(200).json(result);
  });
});

// gte the one data  
app.get('/read/:id' , (req, res)=>{
  const sql = "select * from users WHERE id=?";
  const id = req.params.id; 
  db.query(sql,[id], (err, result)=>{
    if(err){
      return res.json({message: 'error'})
    }
    return res.json(result); 
  }) 
})
// put method  ........................................ 
app.put('/update/:id', (req, res)=>{
  const sql = 'UPDATE users SET `name`=?, `email`= ? WHERE id=?'; 
  const id = req.params.id; 
  
  db.query(sql, [req.body.name,req.body.email,  id], (err, result)=>{
    if(err){
      return res.json({message: 'error'})
    }
    return res.json(result); 
  })
})

app.delete('/delete/:id', (req, res) => {
  const sql = "DELETE FROM users WHERE id = ?"; 
  const id = req.params.id; 
  
  db.query(sql, [id], (err, result) => {
      if (err) {
          return res.json({ message: 'error' });
      }
      
      return res.json({ message: 'User deleted successfully' });
  });
});



// login and signup page ........................................................... 

app.post("/signup", (req, res) => {
  // Define SQL query
  let sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";

  // Create an array with the user details
  let details = [
    req.body.name, 
    req.body.email,
    req.body.password
  ];

  // Log details to the console for debugging
  console.log(details);

  // Execute the query
  db.query(sql, [details], (error, result) => {
    if (error) {
      // Return an error response if something goes wrong
      return res.status(500).json({ error: error.message });
    }else if (result.affectedRows > 0) {
      return res.status(200).json({ message: "User registered successfully", result }); 
  } else {
      return res.status(400).json("No rows affected"); 
  }
    
    
  });
});


// login vcode................













