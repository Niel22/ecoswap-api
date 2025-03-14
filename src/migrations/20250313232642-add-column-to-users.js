'use strict';

const { url } = require('../utils/helpers');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
    await queryInterface.addColumn('Users', 'image', { 
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "public/users/mock-image.jpeg"
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Users', 'image');

  }
};
