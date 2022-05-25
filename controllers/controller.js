const { User, Profil, Course, UserCourse} = require('../models')

class Controller {
    static home(req, res) {
        res.render('index')
    }
}

module.exports = {
    Controller
}