const { Controller } = require('../controllers/controller')
const router = require('express').Router()

//router index
router.get('/', Controller.home)

router.use('/admin', require('./admin'))


//====router student
router.get('/login/:studentsId', Controller.studentPage)                                  //student profile page


module.exports = router