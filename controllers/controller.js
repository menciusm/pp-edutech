const { User, Profile, Course, UserCourse} = require('../models')
const minutesConverter = require('../helpers/minutesConverter')
const ageConverter  = require('../helpers/ageConverter')
const bcrypt = require('bcryptjs')

class Controller {
    static home(req, res) {
        res.render('index')
    }
    static registerForm(req,res) {
        res.render('registerForm')
    }
    static register(req, res) {
        console.log(req.body);
        const {email, password, name, dateOfBirth, gender} = req.body
        User.create({
            email: email,
            password: password
        })
        .then((result) => {
            const UserId = +result.id
            return Profile.create({
                name: name,
                age: ageConverter(dateOfBirth),
                gender: gender,
                UserId: UserId
            })
        })
        .then(() => {
            res.redirect('../login')
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static login (req, res) {
        const error = req.query.error
        // console.log(req.query);
        res.render('loginForm', {error})
    }
    static submit (req, res) {
        const {email, password} = req.body
        User.findOne({
            where: {
                email: email
            }
        })
        .then((user) => {
            if(user) {
                const isValidPassword = bcrypt.compareSync(password, user.password)

                if (isValidPassword) {
                    if (user.role === 'student') {
                        return res.redirect(`../student/${user.id}`)
                    } else {
                        const error = `Invalid email or password`
                        return res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = `Invalid email or password`
                    return res.redirect(`/login?error=${error}`)
                }
            }
        })
        .catch((err) => {
            res.send(err)
        })
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
        const { filter, sort} = req.query
        const option = {
            attributes: {
                exclude:["createdAt", "updatedAt"]
            },
        }
        if (filter) {
            option.where = {
                category: filter
            }
        }
        if (sort) {
            option.order = [
                [sort, "ASC"]
            ]
        }
        Course.findAll(option)
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
            if (err.name = "SequelizeValidationError") {
                err = err.errors.map(el => el.message)
            }
            res.send(err)
        })
    }
    static editProfile(req, res) {
        // console.log(req.body);
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