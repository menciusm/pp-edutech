const { Controller } = require('../controllers/controller')
const router = require('express').Router()
const student = require('./student')

//router index
router.get('/', Controller.home)
router.get('/register', Controller.registerForm)
router.post('/register', Controller.register)
router.get('/login', Controller.login)                                                    //login page
router.post('/login', Controller.submit)                                                   //login submit
router.get('/logout', Controller.logout)                                                   //logout submit

router.use(function(req, res, next) {
    if(!req.session.userId) {
        const error = `Please login first`
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
})

router.use('/student', student)

module.exports = router