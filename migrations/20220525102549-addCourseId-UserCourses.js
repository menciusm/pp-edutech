'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('UserCourses', 'CourseId', { 
      type: Sequelize.INTEGER,
      references : {
        model: 'Courses',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }, {});
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('UserCourses', 'CourseId', {});
  }
};