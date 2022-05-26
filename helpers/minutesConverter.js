function minutesConverter(num) { 
    let hours = Math.floor(num / 60);  
    let minutes = num % 60;
    if (minutes === 0) {
        return `${hours} Hour(s)`;         
    } else {
        return `${hours} Hour(s) ${minutes} Minute(s)`;         
    }
}
// console.log(minutesConverter(60));
module.exports = minutesConverter