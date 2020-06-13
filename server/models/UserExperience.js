// sequelize : Models should be defined with the singular form of a word.
// ex; users table to be named user
// https://sequelize.org/master/manual/naming-strategies.html

const UserExperience = (Sequelize, connection) => {
  let userExpSch = connection.define("Users_Experience", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    company: {
      type: Sequelize.STRING,
      allowNull: false
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false
    },
    joinDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    relieveDate: {
      type: Sequelize.DATE
    },
    current: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  });
  return userExpSch;
};

module.exports = UserExperience;
