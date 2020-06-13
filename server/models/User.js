// sequelize : Models should be defined with the singular form of a word.
// ex; Users table to be named User
// ex; foo (singular), and the respective table name is foos
// https://sequelize.org/master/manual/naming-strategies.html

const User = (Sequelize, connection) => {
  let userSch = connection.define("User", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    avatar: {
      type: Sequelize.STRING,
    },
    verifyAccount: {
      type: Sequelize.STRING,
    },
  });
  return userSch;
};

module.exports = User;
