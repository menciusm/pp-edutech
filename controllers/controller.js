const { User, Profile, Course, UserCourse} = require('../models')
const {countComplete, countOnGoing} = require('../helpers/count-status')
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
            if (err.name = "SequelizeValidationError") {
                err = err.errors.map(el => el.message)
            }
            res.send(err)
        })
    }
    static login (req, res) {
        const error = req.query.error
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
                    req.session.userId = +user.id
                    if (user.role === 'student') {
                        return res.redirect(`../student/${user.id}`)
                    } if (user.role === 'admin') {
                        return res.redirect(`../admin/${user.id}`)
                    } else { // tambahin else if admin
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
    static logout (req, res) {
        req.session.destroy((err)=> {
            if (err) {
                console.log(err);
            } else {
                res.redirect('../login')
            }
        })
    }
    static studentPage(req, res) {
        const id = +req.params.studentsId
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
            res.redirect(`student/${UserId}`)
        })
        .catch((err) => {
            if (err.name = "SequelizeValidationError") {
                err = err.errors.map(el => el.message)
            }
            res.send(err)
        })
    }
    static editProfileForm(req, res) {
        const id = +req.params.studentsId
        Profile.findOne({
            attributes: {
                exclude:["createdAt", "updatedAt"]
            },
            where: {
                UserId: id
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
        const UserId = +req.params.studentsId
        const { name, age, gender} = req.body
        Profile.update({
            name: name,
            age: +age,
            gender: gender,
        },{
            where: {
                UserId: UserId
            }
        })
        .then(() => {
            res.redirect(`student/${UserId}`)
        })
        .catch((err) => {
            if (err.name = "SequelizeValidationError") {
                err = err.errors.map(el => el.message)
            }
            res.send(err)
        })
    }
    static delete(req, res) {
        const CourseId = +req.params.courseId
        const UserId = +req.params.studentsId
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

    // ADMIN
    static adminStudentPage(req, res) {
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
                role: 'student'
            }
        })
        .then(data => {
            // console.log(data);
            res.render("student-admin", {data})
        })
        .catch(err => {
            res.send(err)
        })
    }
    
    static adminCourse(req, res) {
        Course.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            include: [{
                model: User,
                attributes: {
                    exclude:["createdAt", "updatedAt"]
                }
            }],
            order: [['name', 'ASC']]
        })
        .then(data => {
            // console.log(JSON.stringify(data, null, 2));
            res.render("admin-course", {data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static addFormCourse(req, res) {
        res.render('create-course')
    }

    static addCourse(req, res) {
        const {name, description, duration, category} = req.body
        Course.create({name, description, duration, category})
        .then(() => {
            res.redirect('/admin/course')
        })
        .catch((err) => {
            if (err.name = "SequelizeValidationError") {
                err = err.errors.map(el => el.message)
            }
            res.send(err)
        })
    }

    static deleteCourse(req, res) {
        const id = +req.params.id
        Course.deleteCourse(id)
        .then(() => {
            res.redirect('/admin/course')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static editFormCourse(req, res) {
        const id = +req.params.id
        Course.findByPk(id, {
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })
        .then(data => {
            res.render('edit-course', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static editCourse(req, res) {
        const id = +req.params.id
        const {name, description, duration, category} = req.body 
        Course.update({name, description, duration, category}, 
            { where: {id: id} })
        .then(() => {
            res.redirect("/admin/course")
        })
        .catch((err) => {
            if (err.name = "SequelizeValidationError") {
                err = err.errors.map(el => el.message)
            }
            res.send(err)
        })
    }

    static courseDetail(req, res) {
        const id = +req.params.id
        User.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            include: [{
                model: Course,
                attributes: {
                    exclude:["createdAt", "updatedAt"]
                },
                where: {
                    id: id
                }
            },
            {
                model: Profile,
                attributes: {
                    exclude:["createdAt", "updatedAt"]
                }
            }],
        })
        .then(data => {
            // console.log(JSON.stringify(data, null, 2));
            res.render('course-student', {data, countComplete, countOnGoing})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static changeStatus(req, res) {
        const {status} = req.body
        const userId = +req.params.userId
        console.log(req.body, req.params);
        let x = null
        status === "Completed" ? x = false : x = true
        
        UserCourse.update({
            status: x
        }, {
            where: { UserId: userId }
        })
        .then(() => {
            res.redirect(`./`)
        })
        .catch((err) => {
            if (err.name = "SequelizeValidationError") {
                err = err.errors.map(el => el.message)
            }
            res.send(err)
        })
    }

    static courseChart(req, res) {
        Course.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            include: [{
                model: User,
                attributes: {
                    exclude:["createdAt", "updatedAt"]
                }
            }],
            order: [['name', 'ASC']]
        })
        .then(result => {
            // console.log(JSON.stringify(result, null, 2));
            res.render("course-chart", {result})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static adminPage(req, res) {
        const id = +req.params.adminId
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
                role: 'admin',
            },
        })
        .then((data) => {
            res.render('admin-home', {data})
        })
        .catch((err) => {
            res.send(err)
        })
    }
}

module.exports = {
    Controller
}