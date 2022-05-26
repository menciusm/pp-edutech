function getAge(dateOfBirth) {
    let currentYear = new Date().getFullYear()
    let birth = +dateOfBirth.slice(0,4)
    return currentYear - birth
}
// console.log(getAge());
// console.log(getAge('1993-05-13'));

module.exports = getAge