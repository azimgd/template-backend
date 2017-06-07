module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('products', 'currency', {
    type: Sequelize.STRING,
    after: 'price',
  }),

  down: queryInterface => queryInterface.removeColumn('products', 'currency'),
};
