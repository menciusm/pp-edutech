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
    static editProfileForm(req, res) {
        const id = +req.params.studentsId
        // console.log(id);
        Profile.findByPk(id, {
            attributes: {
                exclude:["createdAt", "updatedAt"]
            }
        })
        .then((data) => {
            res.render('editProfileForm', {data})
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static editProfile(req, res) {
        console.log(req.body);
        const UserId = +req.params.studentsId
        const { name, age, gender} = req.body
        Profile.update({
            name: name,
            age: +age,
            gender: gender,
        },{
            where: {
                id: UserId
            }
        })
        .then(() => {
            res.redirect(`../${UserId}`)
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static delete(req, res) {
        const CourseId = +req.params.courseId
        const UserId = +req.params.studentsId
        // console.log(CourseId);
        UserCourse.destroy({
            where: {
                UserId: UserId,
                CourseId: CourseId
            }
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