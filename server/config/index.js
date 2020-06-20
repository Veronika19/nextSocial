//https://sequelize.org/master/manual/model-basics.html
// By default, when the table name is not given, Sequelize automatically pluralizes the model name and uses that as the table name.
const Sequelize = require("sequelize");
const keys = require("./keys");

const connection = new Sequelize(keys.database, keys.username, keys.password, {
	port: "3306",
	host: keys.host,
	dialect: "mysql",
	// operatorsAliases : operatorsAliases,
	// timezone: 'Asia/Calcutta',
	logging: false,
});

// module.exports = connection;
let db = {};
try {
	connection.authenticate();
	console.log("Connection has been established successfully.");
} catch (err) {
	console.log(err);
}

db.connection = connection;
db.Sequelize = Sequelize;

db.User = require("../models/User")(Sequelize, connection);
db.Profile = require("../models/Profile")(Sequelize, connection);
db.UserEducation = require("../models/UserEducation")(Sequelize, connection);
db.UserExperience = require("../models/UserExperience")(Sequelize, connection);
db.UserSkill = require("../models/UserSkill")(Sequelize, connection);
db.Skill = require("../models/Skill")(Sequelize, connection);

db.Post = require("../models/Post")(Sequelize, connection);
db.Like = require("../models/Like")(Sequelize, connection);
db.Comment = require("../models/Comment")(Sequelize, connection);

///////////////  Assoications /////////////////////////////

// db.User.hasOne(db.Profile, { onDelete: 'CASCADE', hooks: true }); // CASCADE does not work unless you do migration from sequelize
// https://stackoverflow.com/questions/61066660/is-there-a-way-to-use-sequelize-ondelete-cascade-without-migrations-for-mysql-da
// db.User.hasOne(db.Profile);
db.User.hasMany(db.UserEducation);
db.User.hasMany(db.UserExperience);
db.User.hasMany(db.UserSkill);
db.User.hasMany(db.Like);
db.Post.hasMany(db.Like);
db.User.hasMany(db.Comment);
db.User.hasOne(db.Profile);
db.Post.hasMany(db.Comment);
db.Skill.hasMany(db.UserSkill);

db.Post.belongsTo(db.User, { foreignKey: "userId" });
db.Profile.belongsTo(db.User, { foreignKey: "userId" });
db.Profile.hasMany(db.UserExperience, {
	sourceKey: "userId",
	foreignKey: "userId",
});
db.Profile.hasMany(db.UserEducation, {
	sourceKey: "userId",
	foreignKey: "userId",
});
db.UserEducation.belongsTo(db.User, { foreignKey: "userId" });
db.UserExperience.belongsTo(db.User, { foreignKey: "userId" });
db.UserSkill.belongsTo(db.User, { foreignKey: "userId" });
db.Comment.belongsTo(db.User, { foreignKey: "userId" });

module.exports = db;
