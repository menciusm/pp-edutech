const router = require('express').Router()
const { Controller } = require('../controllers/controller')

router.get('/:studentsId', Controller.studentPage)                                  //student profile page
router.get('/:studentsId/addCourse', Controller.addCourseForm)           //student add course form
router.post('/:studentsId/addCourse', Controller.addCourse)              //student add course
// router.get('/:studentsId/editProfile', Controller.editProfileForm)         //student edit course form
// router.post('/:studentsId/editProfile', Controller.editProfile)        //student edit course
router.get('/:studentsId/deleteCourse/:courseId', Controller.delete)               //student delete course

module.exports = router