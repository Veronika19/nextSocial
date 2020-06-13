// sequelize : Models should be defined with the singular form of a word.
// ex; users table to be named User
// https://sequelize.org/master/manual/naming-strategies.html

const Like = (Sequelize, connection) => {
  let likeSch = connection.define("Like", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    postId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });
  return likeSch;
};

module.exports = Like;
