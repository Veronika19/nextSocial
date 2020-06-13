const keys = require("../config/keys");
const JwtStrategy = require("passport-jwt").Strategy;
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport, db) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        // const user = await db.User.findByPk(jwt_payload.id);
        const user = await db.User.findOne({
          where: { id: jwt_payload.id, status: "active" },
        });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(null, err);
      }
    })
  );
};
