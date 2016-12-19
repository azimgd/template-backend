module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ProductOptions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    key: {
      type: Sequelize.STRING
    },
    value: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),

  down: (queryInterface) => queryInterface.dropTable('ProductOptions'),
};
