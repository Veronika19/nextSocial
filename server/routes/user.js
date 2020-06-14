const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");
const validRegisterUser = require("../validation/register");
const validLoginUser = require("../validation/login");
const validateUpPassInput = require("../validation/update-pass");
const mail = require("../config/mail");

module.exports = (app, db) => {
  //@desc user registration
  //@access Public
  app.post("/api/users/register", async (req, res) => {
    // console.log("this");
    const reqData = req.body;
    // console.log(reqData);
    const { errors, isValid } = validRegisterUser(reqData);
    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    try {
      const user = await db.User.findOne({ where: { email: reqData.email } });
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      }

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(reqData.password, salt);
      const avatar = "image_url";
      const userCreate = await db.User.create({
        name: reqData.name,
        email: reqData.email,
        status: "inactive",
        verifyAccount: salt,
        password,
        avatar,
      });
      // // Send registration main
      // const withSlash = salt.replace(/\//g, "slash");
      // const confirmUrl = `${keys.redirectDomain}/account/users/confirm/${withSlash}`;
      // const mailData = {
      //   to: reqData.email,
      //   from: "info@devzilla.co.in",
      //   subject: "DevZilla Account Verification Link",
      //   emailData: { confirmUrl, userCreate },
      //   template: "register",
      // };
      // mail(mailData);
      return res.status(200).send({ id: userCreate.id });
    } catch (err) {
      if (err.name === "SequelizeConnectionRefusedError") {
        errors.connection =
          "There has been some errors from our side, please try after sometimes.";
        return res.status(400).send(errors);
      } else {
        return res.status(400).send(err.name);
      }
    }
  });

  // app.get("/confirm", (req, res) => {
  //   res.status(200).json("hello");
  // });

  app.get("/account/users/confirm/:confirmKey", async (req, res) => {
    const confirmKey = req.params.confirmKey.replace(/slash/g, "/");
    // upsert was not working properly
    // https://sequelize.org/v5/class/lib/model.js~Model.html#static-method-upsert
    // console.log(confirmKey);
    try {
      const user = await db.User.findOne({
        where: { verifyAccount: confirmKey, status: "inactive" },
        fields: ["id", "name"],
      });
      // console.log(user);
      if (user !== null) {
        const updateUser = await db.User.update(
          { status: "active", verifyAccount: null },
          { where: { id: user.id } }
        );
        res
          .status(201)
          .cookie(
            "acct-confirm-msg",
            "Your account has been activated, Please log in.",
            {
              expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 30 seconds
            }
          )
          .redirect("/login");
      } else {
        res
          .status(201)
          .cookie(
            "acct-confirm-msg",
            "Your account is already active, Please login in.",
            {
              expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 30 seconds
            }
          )
          .redirect("/login");
      }
    } catch (err) {
      res
        .status(201)
        .cookie(
          "acct-confirm-msg",
          "There has been an error while account confirmation, try again.",
          {
            expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 30 seconds
          }
        )
        .redirect("/register");
    }
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      session: false,
      failureRedirect: "/login",
    }),
    (req, res) => {
      if (req.user.name === "SequelizeConnectionRefusedError") {
        res
          .status(201)
          .cookie(
            "acct-confirm-msg",
            "There has been an error while account confirmation, Please try after sometimes .",
            {
              expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 30 seconds
            }
          )
          .redirect("/register");
      }
      const payload = { id: req.user.id, name: req.user.name };
      jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
        let bToken = "Bearer " + token;
        res.status(201).redirect(301, `/google/${bToken}`);
      });
    }
  );

  app.post("/api/users/login", async (req, res) => {
    const reqData = req.body;
    const { errors, isValid } = validLoginUser(reqData);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    try {
      const user = await db.User.findOne({
        where: { email: reqData.email, status: "active" },
      });
      if (user === null) {
        const inActiveUser = await db.User.findOne({
          where: { email: reqData.email, status: "inactive" },
        });
        errors.email = "User not found";
        if (inActiveUser !== null) {
          errors.email =
            "Your account is inactive , please contact us with your account email.";
        }
        return res.status(400).json(errors);
      }
      // Check password
      const match = await bcrypt.compare(reqData.password, user.password);
      if (match) {
        // user matched , create JWT
        const payload = { id: user.id, name: user.name };
        //sign token
        // expire in half an hour
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Password is incorrect";
        return res.status(404).json(errors);
      }
    } catch (err) {
      if (err.name === "SequelizeConnectionRefusedError") {
        errors.connection =
          "There has been some errors from our side, please try after sometimes.";
        res.status(402).json(errors);
      } else {
        errors.connection = err.name;
        res.status(402).json(errors);
      }
    }
  });

  //@desc return true if matched
  //@access private
  app.post(
    "/api/users/match-password",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        const user = await db.User.findOne({
          where: { id: req.user.id, status: "active" },
        });
        // console.log(req.body.password);
        const match = await bcrypt.compare(req.body.password, user.password);
        return res.status(200).json({ match });
      } catch (err) {
        res.status(400).json({ error: "Server error" });
      }
    }
  );

  //@desc return true if updated
  //@access private
  app.post(
    "/api/users/update-password",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const reqData = req.body;
      const { errors, isValid } = validateUpPassInput(reqData);
      // check validation
      if (!isValid) {
        return res.status(400).json({ msg: errors.password2, status: false });
      }
      try {
        const user = await db.User.findOne({
          where: { id: req.user.id, status: "active" },
        });
        if (user !== null) {
          const salt = await bcrypt.genSalt(10);
          const password = await bcrypt.hash(reqData.password, salt);
          console.log(password);
          const updateUser = await db.User.update(
            { password },
            { where: { id: user.id }, limit: 1 }
          );
          console.log(updateUser);
          if (updateUser[0] === 1)
            return res
              .status(200)
              .json({ msg: "Password Updated", status: true });
        } else {
          return res.status(200).json({ error: "Invalid User", status: false });
        }
      } catch (err) {
        res.status(400).json({ error: "Server error", status: false });
      }
    }
  );

  //@desc return current user
  //@access Private
  app.get(
    "/api/users/current",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      let errors = {};
      try {
        const currUser = await db.User.findOne({
          where: { id: req.user.id },
          attributes: ["id", "name", "password"],
        });
        return res.status(200).json(currUser);
      } catch (err) {
        errors.connection =
          "There has been some errors from our side, please try after sometimes.";
        res.status(402).send(errors);
      }
    }
  );

  // @access  Private
  // @desc Delete User and profile
  app.delete(
    "/api/user",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const errors = {};
      try {
        const userData = await db.User.findOne({
          where: { id: req.user.id },
        });
        if (userData == null) {
          errors.noUser = "No user found to delete";
          return res.status(404).json(errors);
        } else {
          const userDeac = await db.User.update(
            { status: "inactive" },
            { where: { id: req.user.id } }
          );
          return res.status(200).json(userDeac);
        }
      } catch (err) {
        res.status(404).json(err);
      }
    }
  );
};
