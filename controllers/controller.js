const { User, Profile, Course, UserCourse} = require('../models')

class Controller {
    static home(req, res) {
        res.render('index')
    }
    static studentPage(req, res) {
        const id = +req.params.studentsId
        console.log(+req.params.studentsId);
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
}

module.exports = {
    Controller
}