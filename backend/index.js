const express = require("express")
const app = express();
const cors = require("cors")
const port = 4400;
// Database
const mysql = require("mysql")
const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database: "mysql_node_react_bookdb"
})
app.use(express.json());
app.use(cors());
// Operations
app.get("/", (req, res)=>{
    res.send("Server is running");
})
// All books
app.get("/books", (req, res)=>{
    const query = "SELECT * FROM mysql_node_react_bookdb.books";
    db.query(query, (err, data)=>{
        if(err){
            return res.json(err);
        }
        return res.json(data);
    })
})
// Add books
app.post("/books", (req, res)=>{
    const query = "INSERT INTO `books`(`title`, `desc`, `cover`, `price`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ];
    db.query(query, [values], (err, data)=>{
        if(err){
            return res.json(err);
        }
        return res.json("Successfully added");
    })
    // console.log(values)
})
app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = " DELETE FROM books WHERE id = ? ";
  
    db.query(q, [bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  
  app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
  
    const values = [
      req.body.title,
      req.body.desc,
      req.body.price,
      req.body.cover,
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  
app.listen(port, ()=>{
    console.log("Connected to backend");
})