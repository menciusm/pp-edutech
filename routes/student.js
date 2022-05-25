const router = require('express').Router()
const { Controller } = require('../controllers/controller')

router.get('/:studentsId', Controller.studentPage)                                  //student profile page
// router.get('/:studentsId/addCourse', Controller.addCourseForm)           //student add course form
// router.post('/:studentsId/addCourse', Controller.addCourse)              //student add course
// router.get('/:studentsId/editCourse', Controller.editCourseForm)         //student edit course form
// router.post('/:studentsId/editCourse', Controller.editCourse)        //student edit course
// router.get('/:studentsId/deleteCourse', Controller.delete)               //student delete course

module.exports = router