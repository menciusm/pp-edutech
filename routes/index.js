const { Controller } = require('../controllers/controller')
const router = require('express').Router()

//router index
router.get('/', Controller.home)

// router.use('/student', require('./routes/student'))
router.use('/admin', require('./admin'))
// router.get('/login', LoginController.login)                                                    //login page
// router.post('/login', LoginController.submit)                                                   //login submit
// router.post('/logout', LoginController.logout)                                                   //logout submit

//====router student
router.get('/login/:studentsId', Controller.studentPage)                                  //student profile page
// router.get('/login/:studentsId/courseList', Controller.courseList)                        //student list course
// router.get('/login/:studentsId/courseList/addCourse', Controller.addCourseForm)           //student add course form
// router.post('/login/:studentsId/courseList/addCourse', Controller.addCourse)              //student add course
// router.get('/login/:studentsId/courseList/editCourse', Controller.editCourseForm)         //student edit course form
// router.post('/login/:studentsId/courseList/editCourse', Controller.editCourseForm)        //student edit course
// router.get('/login/:studentsId/courseList/deleteCourse', Controller.delete)               //student delete course

//=====router admin
// router.get('/login/:adminId', AdmController.adminPage)                                       //admin home page
// router.get('/login/:adminId/courseList', AdmController.adminCourseList)                      //admin list course
// router.get('/login/:adminId/courseList/addCourse', AdmController.adminAddCourseForm)         //admin add course form
// router.post('/login/:adminId/courseList/addCourse', AdmController.adminAddCourse)            //admin add course
// router.get('/login/:adminId/courseList/editCourse', AdmController.adminEditCourseForm)       //admin edit course form
// router.post('/login/:adminId/courseList/editCourse', AdmController.adminEditCourseForm)      //admin edit course
// router.get('/login/:adminId/courseList/deleteCourse', AdmController.adminDelete)             //admin delete course


module.exports = router