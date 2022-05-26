const { User, Profile, Course, UserCourse} = require('../models')
const {countComplete, countOnGoing} = require('../helpers/count-status')

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
                id: id
            },
        })
        .then((data) => {
            res.render("students", {data})
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
        .catch(err => {
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
        .catch(err => {
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
        const courseId = +req.params.id
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
        .catch(err => {
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
}

module.exports = {
    Controller
}