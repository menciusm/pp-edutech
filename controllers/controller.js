const { User, Profile, Course, UserCourse} = require('../models')

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
}

module.exports = {
    Controller
}