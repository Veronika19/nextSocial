// sequelize : Models should be defined with the singular form of a word.
// ex; users table to be named User
// https://sequelize.org/master/manual/naming-strategies.html

const Comment = (Sequelize, connection) => {
  let commentSch = connection.define("Comment", {
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
    },
    comment: {
      type: Sequelize.TEXT
    }
  });
  return commentSch;
};

module.exports = Comment;
