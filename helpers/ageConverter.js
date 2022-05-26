function getAge(dateOfBirth) {
    let currentYear = new Date().getFullYear()
    let birth = +dateOfBirth.slice(0,4)
    return currentYear - birth
}

module.exports = getAge