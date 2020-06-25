// sequelize : Models should be defined with the singular form of a word.
// ex; users table to be named user
// https://sequelize.org/master/manual/naming-strategies.html

const UserSkill = (Sequelize, connection) => {
  let userSkillSch = connection.define("users_skills", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    skillId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return userSkillSch;
};

module.exports = UserSkill;
