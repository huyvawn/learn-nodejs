const express = require('express')
const router = express.Router()
const personController = require('../controllers/personController')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

router.use(bodyParser.urlencoded({extended: true}))
router.use(methodOverride('_method'))

router.get("/show", personController.getAllPersons)
// router.post
// router.put
// router.delete

module.exports = router