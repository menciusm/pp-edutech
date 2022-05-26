const router = require('express').Router()
const { Controller } = require('../controllers/controller')

router.get('/student', Controller.adminStudentPage)
router.get('/course', Controller.adminCourse)
router.get('/course/add', Controller.addFormCourse)
router.post('/course/add', Controller.addCourse)
router.get('/course/chart', Controller.courseChart)
router.get('/course/:id/delete', Controller.deleteCourse)
router.get('/course/:id/edit', Controller.editFormCourse)
router.post('/course/:id/edit', Controller.editCourse)
router.get('/course/:id/enrolled', Controller.courseDetail)
router.post('/course/:id/enrolled/:userId', Controller.changeStatus)


// router.get('/admin/:adminId/courseList', AdmController.adminCourseList)                      //admin list course
// router.get('/admin/:adminId/courseList/addCourse', AdmController.adminAddCourseForm)         //admin add course form
// router.post('/admin/:adminId/courseList/addCourse', AdmController.adminAddCourse)            //admin add course
// router.get('/admin/:adminId/courseList/editCourse', AdmController.adminEditCourseForm)       //admin edit course form
// router.post('/admin/:adminId/courseList/editCourse', AdmController.adminEditCourseForm)      //admin edit course
// router.get('/admin/:adminId/courseList/deleteCourse', AdmController.adminDelete)             //admin delete course

module.exports = router