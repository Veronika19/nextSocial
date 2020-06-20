// sequelize : Models should be defined with the singular form of a word.
// ex; Users table to be named User
// ex; foo (singular), and the respective table name is foos
// https://sequelize.org/master/manual/naming-strategies.html

const Skill = (Sequelize, connection) => {
  let skillSch = connection.define("skill", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return skillSch;
};

module.exports = Skill;
