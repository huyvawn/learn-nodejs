const mysql = require('mysql2')
const express = require('express')
const app = express()
const bodyParse = require('body-parser')
const port = 3000

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'dbfpt'
})

connection.connect(err=>{
    if(err){
        console.error("Chua ket noi duoc mysql")
    } else {
        console.log("Da ket noi mysql")
    }
})

app.get('/',(req,res)=>{
    res.send("Homepage")
})

// Chuc nang CRUD 
// Show data
app.use(bodyParse.json())
app.get('/students',(req,res)=>{
    const sql = 'SELECT * FROM dbfpt.students'
    connection.query(sql,(err,result)=>{
        if(err) res.status(500).send(err.message)
            else res.json(result)
    })
})
// Show theo id
app.get('/students/:id',(req,res)=>{
    const id = req.params.id;
    const sql = 'SELECT * FROM dbfpt.students WHERE id = ?'
    connection.query(sql,[id],(err,result)=>{
        if(err) res.status(500).send(err.message)
            else res.json(result)
    })
})
// Create data
app.post('/students',(req,res)=>{
    const {name, age, country, clazz} = req.body
    const sql = "INSERT INTO dbfpt.students (name, age, country, clazz) VALUES (?,?,?,?)"
    connection.query(sql,[name,age,country,clazz],(err,result)=>{
        if(err) res.status(500).send(err.message)
            else res.status(201).send("Da them student")
    })
})
// Delete data
app.delete('/students/:id',(req,res)=>{
    const id= req.params.id
    const sql = " DELETE FROM dbfpt.students WHERE id = ?"
    connection.query(sql,[id],(err,result)=>{
        if(err) res.status(500).send(err.message)
            else res.send('Da xoa student')
    })
})
//Update
app.put('/students/:id',(req,res)=>{
    const id = req.params.id
    const {name, age, country, clazz} = req.body
    const sql = "UPDATE students SET name=?,age=?,country=?,clazz=? WHERE id=?"
    connection.query(sql,[name,age,country,clazz,id],(err,result)=>{
        if(err) res.status(500).send(err.message)
        else res.send("Da cap nhat student")
    })
})