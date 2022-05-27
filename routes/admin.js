const router = require('express').Router()
const { Controller } = require('../controllers/controller')

router.get('/', Controller.adminPage)
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

module.exports = router