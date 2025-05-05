const express = require('express')
const mongoose = require('mongoose')
const app = express()
const personRoutes = require("./routes/personRoutes")

mongoose.connect('mongodb://localhost:27017/test')
.then(()=> console.log('Ket noi thanh cong'))
.catch(err => console.err("Loi ket noi"))

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/',personRoutes)
app.listen(3000, ()=>{
    console.log("Server da chay tai localhost://3000")
})