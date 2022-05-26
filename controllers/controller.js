const { User, Profile, Course, UserCourse} = require('../models')
const minutesConverter = require('../helpers/minutesConverter')

class Controller {
    static home(req, res) {
        res.render('index')
    }
    static studentPage(req, res) {
        const id = +req.params.studentsId
        // console.log(+req.params.studentsId);
        User.findAll({
            attributes: {
                exclude:["createdAt", "updatedAt"]
            },
            include: [{
                model: Profile,
                attributes: {
                    exclude:["createdAt", "updatedAt"]
                }
            },
            {
                model: Course,
                attributes: {
                    exclude:["createdAt", "updatedAt"]
                }
            }],
            where : {
                role: 'student',
                id: id
            },
        })
        .then((data) => {
            res.render('students', {data})
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static addCourseForm(req, res) {
        const id = +req.params.studentsId;
        Course.findAll({
            attributes: {
                exclude:["createdAt", "updatedAt"]
            },
        })
        .then((course) => {
            res.render('addCourseForm', {course, minutesConverter, id})
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static addCourse(req, res) {
        // console.log(+req.body.CourseId);
        // console.log(+req.params.studentsId);
        const CourseId = +req.body.CourseId
        const UserId = +req.params.studentsId
        UserCourse.create({
            status: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            UserId: UserId,
            CourseId: CourseId
        })
        .then(() => {
            res.redirect(`../${UserId}`)
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static editCourseForm(req, res) {

    }
    static editCourse(req, res) {

    }
    static delete(req, res) {
        console.log(+req.params.courseId);
        console.log(+req.params.studentsId);
        // const CourseId = +req.body.CourseId
        const UserId = +req.params.studentsId
        UserCourse.findAll({
            where: {
                UserId: UserId
            }
        })
        .then((result) => {
            const CourseId = result[0].dataValues.CourseId
            return UserCourse.destroy({               
               where : {
                CourseId: CourseId
               }
           })
        })
        .then(() => {
            res.redirect(`/student/${UserId}`)
        })
        .catch((err) => {
            res.send(err)
        })
    }
}

module.exports = {
    Controller
}