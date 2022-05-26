const router = require('express').Router()
const { Controller } = require('../controllers/controller')

router.get('/student', Controller.adminStudentPage)
router.get('/course', Controller.adminCourse)
// router.get('/admin/:adminId/courseList', AdmController.adminCourseList)                      //admin list course
// router.get('/admin/:adminId/courseList/addCourse', AdmController.adminAddCourseForm)         //admin add course form
// router.post('/admin/:adminId/courseList/addCourse', AdmController.adminAddCourse)            //admin add course
// router.get('/admin/:adminId/courseList/editCourse', AdmController.adminEditCourseForm)       //admin edit course form
// router.post('/admin/:adminId/courseList/editCourse', AdmController.adminEditCourseForm)      //admin edit course
// router.get('/admin/:adminId/courseList/deleteCourse', AdmController.adminDelete)             //admin delete course

module.exports = router