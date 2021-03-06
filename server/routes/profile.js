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
  // @access private
  // @desc get skill lists
  app.get("/api/profile/skills", async (req, res) => {
    try {
      const skills = await db.Skill.findAll({
        attributes: ["slug", "name", "id"],
      });
      // console.log(skills);
      if (skills == null) {
        res.status(404).json({ errors: { data: "Not found data" } });
      } else {
        res.status(200).json(skills);
      }
    } catch (err) {
      return res.status(404).json({ errors: { err } });
    }
  });

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
          attributes: ["handle", "company", "location", "status", "social"],
          // include: [db.User, db.UserEducation, db.UserExperience]
        });
        // if (profile !== null) {
        return res.status(200).json(profile);
        // } else {
        // errors.message = "No Profile details found";
        // return res.status(404).json(errors);
        // }
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
          attributes: [
            "handle",
            "totalExp",
            "company",
            "social",
            "website",
            "location",
            "status",
            "bio",
            "githubusername",
            "userId",
          ],
          include: [{ model: db.UserSkill, attributes: ["skillId"] }],
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

  async function updateUsersprofile(db, req, reqData, res) {
    await db.UserSkill.destroy({
      where: { userId: req.user.id },
    });
    const updatedProf = await db.Profile.update(reqData, {
      where: { userId: req.user.id },
    });
    console.log(reqData.users_skills);
    await db.UserSkill.bulkCreate(reqData.users_skills);
    return res.status(200).json(updatedProf);
  }

  // @access Private
  // @desc Create and Edit of user profile
  app.post(
    "/api/profile",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const reqData = req.body;
      const { errors, isValid } = validateProfileInput(reqData);

      if (!isValid) {
        return res.status(400).json(errors);
      }

      reqData.userId = req.user.id;

      reqData.users_skills = reqData.users_skills.map((skill) => {
        return { skillId: skill, userId: req.user.id };
      });

      socialProf = [];
      socialProf.push(reqData.twitter.trim());
      socialProf.push(reqData.facebook.trim());
      socialProf.push(reqData.linkedin.trim());
      reqData.social = socialProf.toString();

      try {
        const profile = await db.Profile.findOne({
          where: { userId: req.user.id },
        });
        // return res.json(profile);
        if (profile !== null) {
          // console.log(reqData);
          updateUsersprofile(db, req, reqData, res);
        } else {
          const checkHandle = await db.Profile.findOne({
            where: { handle: reqData.handle },
          });
          if (checkHandle !== null) {
            errors.handle = "The handle is already present";
            return res.status(404).json(errors);
          } else {
            // https://sequelize.org/master/manual/creating-with-associations.html
            const addProfile = await db.Profile.create(reqData, {
              include: [db.UserSkill],
            });
            if (addProfile.dataValues.hasOwnProperty("id")) {
              return res.status(200).json(addProfile.id);
            } else {
              errors.saveError = "Unable to create profile, please try again.";
              return res.status(404).json(errors);
            }
          }
        }
      } catch (err) {
        console.log(err);
        return res.status(402).json(err);
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
        include: [db.User, db.UserExperience, db.UserEducation, db.UserSkill],
        attributes: [
          "handle",
          "company",
          "location",
          "status",
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
        include: [
          {
            model: db.User,
            where: { status: "active" },
            include: [db.UserSkill],
          },
        ],
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
      // console.log(reqData);
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
