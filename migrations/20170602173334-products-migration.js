'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Products', 'currency', {
      type: Sequelize.STRING,
      after: 'price',
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Products', 'currency');
  }
};
