const Person = require('../models/person')

// Show all person
exports.getAllPersons = async(req,res)=>{
    try {
        const persons = await Person.find()
        res.render('index', {persons})
    } catch (error) {
        res.status(500).send("Loi khong lay duoc du lieu")
    }
}