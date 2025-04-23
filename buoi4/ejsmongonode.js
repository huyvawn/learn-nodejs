const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost:27017/test')
.then(() => console.log("Ket noi thanh cong"))
.catch(err=> console.error("Loi",err.message))

// const Person = mongoose.model('Person', {},'person')

const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    country: { type: String, required: true }
});
const Person = mongoose.model('Person', personSchema, 'person');

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.listen(3000,()=>{
    console.log("Server dang chay o port 3000")
})

app.get('/',async(req,res)=>{
    const persons = await Person.find();
    res.render('index',{persons})
})

// Them du lieu
app.get('/add',async(req,res)=>{
    res.render('add')
})

app.post('/add', async(req,res)=>{
    const {name,age,country} = req.body
    await Person.create({name,age,country})
    res.redirect('/')
})