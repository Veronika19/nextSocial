// sequelize : Models should be defined with the singular form of a word.
// ex; users table to be named user
// https://sequelize.org/master/manual/naming-strategies.html

const UserEducation = (Sequelize, connection) => {
  let userEduSch = connection.define("Users_Education", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    school: {
      type: Sequelize.STRING,
      allowNull: false
    },
    degree: {
      type: Sequelize.STRING,
      allowNull: false
    },
    fieldOfStudy: {
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
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    }
  });
  return userEduSch;
};

module.exports = UserEducation;
