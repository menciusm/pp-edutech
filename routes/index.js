const { Controller } = require('../controllers/controller')
const router = require('express').Router()
const student = require('./student')

//router index
router.get('/', Controller.home)
router.get('/register', Controller.registerForm)
router.post('/register', Controller.register)
router.get('/login', Controller.login)                                                    //login page
router.post('/login', Controller.submit)                                                   //login submit
// router.post('/logout', Controller.logout)                                                   //logout submit
router.use('/student', student)

//=====router admin
// router.get('/admin/:adminId', Controller.adminPage)                                       //admin home page
// router.get('/admin/:adminId/courseList', Controller.adminCourseList)                      //admin list course
// router.get('/admin/:adminId/courseList/addCourse', Controller.adminAddCourseForm)         //admin add course form
// router.post('/admin/:adminId/courseList/addCourse', Controller.adminAddCourse)            //admin add course
// router.get('/admin/:adminId/courseList/editCourse', Controller.adminEditCourseForm)       //admin edit course form
// router.post('/admin/:adminId/courseList/editCourse', Controller.adminEditCourseForm)      //admin edit course
// router.get('/admin/:adminId/courseList/deleteCourse', Controller.adminDelete)             //admin delete course


module.exports = router