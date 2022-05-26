'use strict';
const fs = require('fs')

module.exports = {
  up (queryInterface, Sequelize) {
    let data = JSON.parse(fs.readFileSync('./data/courses.json', 'utf8'))
    data.forEach(el => {
      delete el.id
      el.createdAt = new Date()
      el.updatedAt = new Date()
    });
    return queryInterface.bulkInsert('Courses', data, {})
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Courses', null, {})
  }
};

