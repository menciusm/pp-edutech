function countComplete(value) {
    let a = 0
    value.forEach(el => {
        if (el.Courses[0].UserCourse.status === true) {
            a++
        }
    });
    return a
}

function countOnGoing(value) {
    let a = 0
    value.forEach(el => {
        if (el.Courses[0].UserCourse.status === false) {
            a++
        }
    });
    return a
}

module.exports = {countComplete, countOnGoing}