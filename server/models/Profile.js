// sequelize : Models should be defined with the singular form of a word.
// ex; users table to be named User
// https://sequelize.org/master/manual/naming-strategies.html

const Profile = (Sequelize, connection) => {
  let profileSch = connection.define("Profile", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    handle: {
      type: Sequelize.STRING,
      allowNull: false
    },
    company: {
      type: Sequelize.STRING
    },
    website: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    },
    bio: {
      type: Sequelize.STRING
    },
    githubusername: {
      type: Sequelize.STRING
    },
    social: {
      type: Sequelize.JSON
    },
    skills: {
      type: Sequelize.JSON,
      allowNull: false
    }
  });
  return profileSch;
};

module.exports = Profile;
