// sequelize : Models should be defined with the singular form of a word.
// ex; users table to be named User
// https://sequelize.org/master/manual/naming-strategies.html

const Post = (Sequelize, connection) => {
  let postSch = connection.define("Post", {
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
    content: {
      type: Sequelize.TEXT
    },
    likesCount: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    commentsCount: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
  });
  return postSch;
};

module.exports = Post;
