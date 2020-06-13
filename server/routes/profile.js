const passport = require("passport");
const validateProfileInput = require("../validation/profile.js");
const validateExpInput = require("../validation/experience.js");
const validateEduInput = require("../validation/education.js");
const postProfilefields = [
  "handle",
  "company",
  "website",
  "location",
  "bio",
  "status",
  "githubusername",
  "skills",
];
module.exports = (app, db) => {
  // @access Private
  app.get(
    "/api/profile",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const errors = {};
      try {
        const profile = await db.Profile.findOne({
          where: { userId: req.user.id },
          include: [db.UserExperience, db.UserEducation],
          attributes: [
            "handle",
            "company",
            "location",
            "status",
            "skills",
            "social",
          ],
          // include: [db.User, db.UserEducation, db.UserExperience]
        });
        if (profile !== null) {
          return res.status(200).json(profile);
        } else {
          errors.message = "No Profile details found";
          return res.status(404).json(errors);
        }
      } catch (err) {
        return res.status(404).json(err);
      }
    }
  );

  // @access Private
  // @desc Data to edit user profile
  app.get(
    "/api/edit-profile",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const errors = {};
      try {
        const profile = await db.Profile.findOne({
          where: { userId: req.user.id },
          // include: [db.User, db.UserEducation, db.UserExperience]
        });
        if (profile !== null) {
          return res.status(200).json(profile);
        } else {
          errors.message = "No Profile details found";
          return res.status(404).json(errors);
        }
      } catch (err) {
        return res.status(404).json(err);
      }
    }
  );

  // @access Private
  app.post(
    "/api/profile",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const reqData = req.body;
      const { errors, isValid } = validateProfileInput(reqData);

      if (!isValid) {
        return res.status(400).json(errors);
      }

      const profileFields = {};
      profileFields.userId = req.user.id;
      postProfilefields.map((field) => {
        if (reqData[field]) {
          if (field === "skills") {
            profileFields.skills = reqData.skills
              .split(",")
              .map((skill) => skill.trim())
              .toString();
          } else {
            profileFields[field] = reqData[field];
          }
        }
      });
      socialProf = [];
      // if (reqData.facebook)
      socialProf.push(reqData.twitter.trim());
      socialProf.push(reqData.facebook.trim());
      socialProf.push(reqData.linkedin.trim());
      // if (reqData.twitter)
      // if (reqData.linkedin)
      profileFields.social = socialProf.toString();
      // console.log(socialVal.split(','));
      // return res.status(404).send(typeof socialVal);
      try {
        const profile = await db.Profile.findOne({
          where: { userId: req.user.id },
        });
        // return res.json(profile);
        if (profile !== null) {
          const updatedProf = await profile.update(profileFields, {
            where: { userId: req.user.id },
          });
          return res.status(200).json(updatedProf);
        } else {
          const checkHandle = await db.Profile.findOne({
            where: { handle: reqData.handle },
          });
          if (checkHandle !== null) {
            errors.handle = "The handle is already present";
            return res.status(404).json(errors);
          } else {
            const addProfile = await db.Profile.create(profileFields);
            if (addProfile.dataValues.hasOwnProperty("id")) {
              return res.status(200).json(addProfile.id);
            } else {
              errors.saveError = "Unable to create profile, please try again.";
              return res.status(404).json(errors);
            }
          }
        }
      } catch (err) {
        return res.status(400).json(err);
      }
    }
  );

  // @access Public
  // @desc Get profile by handle
  app.get("/api/profile/handle/:handle", async (req, res) => {
    const errors = {};
    try {
      const handle = req.params.handle;
      const profile = await db.Profile.findOne({
        where: { handle },
        include: [db.User, db.UserExperience, db.UserEducation],
        attributes: [
          "handle",
          "company",
          "location",
          "status",
          "skills",
          "social",
          "bio",
        ],
        order: [
          [db.UserExperience, "joinDate", "DESC"],
          [db.UserEducation, "joinDate", "DESC"],
        ],
      });
      if (profile == null) {
        errors.noProfile = "No profile to show";
        return res.status(404).json(errors);
      } else {
        return res.status(200).json(profile);
      }
    } catch (err) {
      return res.status(400).json(err);
    }
  });

  // @access Public
  // @desc Get profile by User Id
  app.get("/api/profile/id/:user_id", async (req, res) => {
    const errors = {};
    const userId = req.params.user_id;
    try {
      // profile belongs to user
      const profile = await db.Profile.findOne({
        where: { userId },
        include: [db.User],
      });
      if (profile == null) {
        errors.noProfile = "No Profile found";
        return res.status(404).json(errors);
      } else {
        return res.status(200).json(profile);
      }
    } catch (err) {
      return res.status(400).json(err);
    }
  });

  // @access Public
  // @desc Get all user profile
  app.get("/api/profile/all", async (req, res) => {
    const errors = {};
    try {
      // profile belongs to user
      // fetching profiles of active users
      const profile = await db.Profile.findAll({
        where: {},
        order: [["createdAt", "DESC"]],
        include: [{ model: db.User, where: { status: "active" } }],
      });
      if (profile == null) {
        errors.noProfile = "No Profile found";
        return res.status(404).json(errors);
      } else {
        return res.status(200).json(profile);
      }
    } catch (err) {
      errors.connectionErr =
        "There has been some errors from our side, please try after sometimes.";
      return res.status(400).json(errors);
    }
  });

  /////////////////// Experience routes for user /////////////////////////////
  // @access Private
  // @desc view user experience
  app.get(
    "/api/profile/experiences",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const errors = {};
      try {
        const expData = await db.UserExperience.findAll({
          where: { userId: req.user.id },
        });
        if (expData == null) {
          errors.noExperience = "No experience found";
          return res.status(404).json(errors);
        } else {
          return res.status(200).json(expData);
        }
      } catch (err) {
        res.status(404).json(err);
      }
    }
  );

  // @access  Private
  // @desc add experience
  app.post(
    "/api/profile/experience/add",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const reqData = req.body;
      const { errors, isValid } = validateExpInput(reqData);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      try {
        reqData.current = reqData.relieveDate === "" ? "true" : "false";
        reqData.userId = req.user.id;
        const expData = await db.UserExperience.create(reqData);
        return res.status(200).json(expData);
      } catch (err) {
        return res.status(400).json(err);
      }
    }
  );

  // @access  Private
  // @desc edit experience
  app.post(
    "/api/profile/experience/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const errors = {};
      try {
        const expData = await db.UserExperience.findOne({
          where: { id: req.params.id, userId: req.user.id },
        });
        if (expData == null) {
          errors.noExperience = "No experience found to update";
          return res.status(404).json(errors);
        } else {
          const reqData = req.body;
          reqData.userId = req.user.id;
          reqData.current = reqData.relieveDate == null ? "true" : "false";
          // return res.send(reqData);
          const expUpdate = await db.UserExperience.update(reqData, {
            where: { id: req.params.id, userId: req.user.id },
          });
          return res.status(200).json(expUpdate);
        }
      } catch (err) {
        res.status(404).json(err);
      }
    }
  );

  // @access  Private
  // @desc Delete experience
  app.delete(
    "/api/profile/experience/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const errors = {};
      try {
        const expData = await db.UserExperience.findOne({
          where: { id: req.params.id, userId: req.user.id },
        });
        if (expData == null) {
          errors.noExperience = "No experience found to delete";
          return res.status(404).json(errors);
        } else {
          const reqData = req.body;
          reqData.userId = req.user.id;
          // return res.send(reqData);
          const expDel = await db.UserExperience.destroy({
            where: { id: req.params.id },
          });
          return res.status(200).json(expDel);
        }
      } catch (err) {
        res.status(404).json(err);
      }
    }
  );

  /////////////////// Education routes for user /////////////////////////////
  // @access Private
  // @desc view user education
  app.get(
    "/api/profile/educations",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const errors = {};
      try {
        const expData = await db.UserEducation.findAll({
          where: { userId: req.user.id },
        });
        if (expData == null) {
          errors.noExperience = "No experience found";
          return res.status(404).json(errors);
        } else {
          return res.status(200).json(expData);
        }
      } catch (err) {
        res.status(404).json(err);
      }
    }
  );

  // @access  Private
  // @desc add experience
  app.post(
    "/api/profile/education/add",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const reqData = req.body;
      const { errors, isValid } = validateEduInput(reqData);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      try {
        reqData.userId = req.user.id;
        reqData.current = reqData.relieveDate == null ? "true" : "false";
        const expData = await db.UserEducation.create(reqData);
        return res.status(200).json(expData);
      } catch (err) {
        return res.status(400).json(err);
      }
    }
  );

  // @access  Private
  // @desc edit experience
  app.post(
    "/api/profile/education/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const errors = {};
      try {
        const expData = await db.UserEducation.findOne({
          where: { id: req.params.id, userId: req.user.id },
        });
        if (expData == null) {
          errors.noExperience = "No experience found to update";
          return res.status(404).json(errors);
        } else {
          const reqData = req.body;
          reqData.userId = req.user.id;
          reqData.current = reqData.relieveDate == null ? "true" : "false";
          // return res.send(reqData);
          const expUpdate = await db.UserEducation.update(reqData, {
            where: { id: req.params.id, userId: req.user.id },
          });
          return res.status(200).json(expUpdate);
        }
      } catch (err) {
        res.status(404).json(err);
      }
    }
  );

  // @access  Private
  // @desc Delete education
  app.delete(
    "/api/profile/education/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const errors = {};
      try {
        const expData = await db.UserEducation.findOne({
          where: { id: req.params.id, userId: req.user.id },
        });
        if (expData == null) {
          errors.noExperience = "No education found to delete";
          return res.status(404).json(errors);
        } else {
          const reqData = req.body;
          reqData.userId = req.user.id;
          // return res.send(reqData);
          const expDel = await db.UserEducation.destroy({
            where: { id: req.params.id },
          });
          return res.status(200).json(expDel);
        }
      } catch (err) {
        res.status(404).json(err);
      }
    }
  );
};
