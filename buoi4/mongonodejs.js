const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

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

//Show data
app.get('/person',async(req,res)=>{
    try{
        const listPersons = await Person.find({})
        res.send(listPersons)
    } catch(err){
        res.status(500).send("Loi khong show duoc data")
    }
})
//Read by id
app.get('/person/:id',async(req,res)=>{
    try{
        const person = await Person.findById(req.params.id)
        if (person) res.send(person)
        else res.status(404).send("Khong tim thay du lieu")
    } catch(err){
        res.status(500).send("Loi khong show duoc data")
    }
})

//create data
app.post('/person',async(req,res)=>{
    try{
        const addPerson = new Person(req.body)
        const add = await addPerson.save()
        res.send(add)
    }catch(err){
        res.status(500).send("Loi khong them duoc du lieu")
    }
})


//Delete Data
app.delete('/person/:id',async(req,res)=>{
    try{
        const deleteData = await Person.findByIdAndDelete(req.params.id)
        if(deleteData) res.send("Xoa thanh cong")
        else res.status(404).send("Khong tim thay du lieu")
    } catch(err){
        res.status(500).send("Khong xoa duoc")
    }
})

//Update Data
app.put('/person/:id',async(req,res)=>{
    try{
        const updateData = await Person.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(updateData) res.send(updateData)
        else res.status(404).send("Khong tim thay du lieu")
    } catch(err){
        res.status(500).send("Khong xoa duoc")
    }
})

app.listen(3000,()=>{
    console.log("Server dang chay o port 3000")
})

