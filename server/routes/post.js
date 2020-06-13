const passport = require("passport");
const validatePostInput = require("../validation/post");
const xss = require("xss");
const isEmpty = require("../validation/is-empty.js");
const xssOption = {
  // whilelist: [],
  whiteList: {
    a: ["href", "title", "target"],
    strong: [],
    i: [],
  }, // empty, means filter out all tags
  stripIgnoreTag: true, // filter out all HTML not in the whilelist
  stripIgnoreTagBody: ["script"], // the script tag is a special case, we need
  // to filter out its content
};

module.exports = (app, db) => {
  // @access Public
  // @desc View all posts
  app.get("/api/posts", async (req, res) => {
    try {
      const postsList = await db.Post.findAll({
        order: [["createdAt", "DESC"]],
        include: [
				{
					model: db.User,
					include: [db.Profile]
				}					
				],
      });
      if (postsList !== null) {
        return res.status(200).json(postsList);
      } else {
        return res.status(400).json({ noPost: "No posts found." });
      }
    } catch (err) {
      return res.status(400).json(err);
    }
  });

  // @access Private
  // @desc View all posts by logged in user
  app.get(
    "/api/post",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        const postsList = await db.Post.findAll({
          where: { userId: req.user.id },
          order: [["createdAt", "DESC"]],
        });
        if (postsList !== null) {
          return res.status(200).json(postsList);
        } else {
          return res.status(400).json({ noPost: "No posts found." });
        }
      } catch (err) {
        return res.status(400).json(err);
      }
    }
  );

  // @access Public
  // @desc View single posts by id
  app.get("/api/post/:id", async (req, res) => {
		// user hasOne Profile
		// post belng to user
		// post hasMany comment
		// comment belong to user
    try {
      const postData = await db.Post.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: db.Comment,
            order: [["createdAt", "DESC"]],
            include: [db.User],
          },
          {
            model: db.User,
						include: [db.Profile],
          },
        ],
      });
      if (postData !== null) {
        return res.status(200).json(postData);
      } else {
        return res.status(400).json({ noPost: "No post found." });
      }
    } catch (err) {
      return res.status(400).json(err);
    }
  });

  // @access Private
  // @desc Add post by logged in User
  app.post(
    "/api/post/add",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const reqData = req.body;
      reqData.content = xss(req.body.content, xssOption);
      // return res.status("400").json(reqData);
      const { errors, isValid } = validatePostInput(reqData);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      try {
        reqData.userId = req.user.id;

        // console.log(reqData)
        const addPost = await db.Post.create(reqData);
        // const addPost = await db.Post.create(reqData, {logging: console.log});
        return res.status(200).json(addPost);
      } catch (err) {
        return res.status(404).json(reqData);
      }
    }
  );

  // @access Private
  // @desc Edit post by logged in User
  app.post(
    "/api/post/edit/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const reqData = req.body;
      const { errors, isValid } = validatePostInput(reqData);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      // check for valid post to edit
      try {
        const fetchPost = await db.Post.findOne({
          where: { id: req.params.id },
        });
        if (fetchPost !== null) {
          const updatePost = await db.Post.update(reqData, {
            where: { id: req.params.id },
          });
          return res.status(200).json(updatePost);
        } else {
          errors.noPosts = "Invalid Post";
          return res.status(400).json(errors);
        }
      } catch (err) {
        return res.status(404).json(err);
      }
    }
  );

  //@delete post by post id
  //@ Private
  app.delete(
    "/api/post/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const errors = {};
      try {
        const checkPost = await db.Post.findOne({
          where: { id: req.params.id, userId: req.user.id },
        });
        if (checkPost !== null) {
          const deletePosts = await db.Post.destroy({
            where: { id: req.params.id, userId: req.user.id },
          });
          return res.status(200).json(deletePosts);
        } else {
          errors.noPosts = "Invlaid Post";
          return res.status(400).json(errors);
        }
      } catch (err) {
        return res.status(400).json(err);
      }
    }
  );

  // @access private
  // @Desc like for post by id
  app.post(
    "/api/post/like/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const errors = {};
      try {
        const checkPost = await db.Post.findOne({
          where: { id: req.params.id },
        });
        if (checkPost !== null) {
          const likedBfr = await db.Like.findOne({
            where: { userId: req.user.id, postId: req.params.id },
          });
          if (likedBfr == null) {
            likeData = { userId: req.user.id, postId: req.params.id };
            const totalLike = ++checkPost.likesCount;
            const addLike = await db.Like.create(likeData);
            const updatePosts = await db.Post.update(
              { likesCount: totalLike },
              { where: { id: req.params.id } }
            );
            return res.status(200).json(updatePosts);
          } else {
            errors.invalidLike = "You have already liked this article";
            return res.status(400).json(errors);
          }
        } else {
          errors.noPosts = "Invalid Post";
          return res.status(400).json(errors);
        }
      } catch (err) {
        return res.status(400).json(err);
      }
    }
  );

  // @access private
  // @Desc delete comment for post by id
  app.delete(
    "/api/post/delete/comment/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const errors = {};
      try {
        const userCommented = await db.Comment.findOne({
          where: { userId: req.user.id, id: req.params.id },
        });

        if (userCommented !== null) {
          const checkPost = await db.Post.findOne({
            where: { id: userCommented.postId },
          });
          const totalComment = --checkPost.commentsCount;
          // return res.status(404).json(totalComment);
          const removeComment = await db.Comment.destroy({
            where: { id: userCommented.id },
          });
          const updatePosts = await db.Post.update(
            { commentsCount: totalComment },
            { where: { id: userCommented.postId } }
          );
          return res.status(200).json(updatePosts);
        } else {
          errors.invalidLike =
            "Sorry, the comment you are trying to remove does not exits.";
          return res.status(400).json(errors);
        }
      } catch (err) {
        return res.status(400).json(err);
      }
    }
  );

  // @access private
  // @Desc add comment for post by id
  app.post(
    "/api/post/comment/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const errors = {};
      try {
        const checkPost = await db.Post.findOne({
          where: { id: req.params.id },
        });
        if (checkPost !== null) {
          const commentedBfr = await db.Comment.findOne({
            where: { userId: req.user.id, postId: req.params.id },
          });
          let comment = xss(req.body.comment, {
            // whilelist: [],
            whiteList: {
              a: ["href", "title", "target"],
              strong: [],
              i: [],
            }, // empty, means filter out all tags
            stripIgnoreTag: true, // filter out all HTML not in the whilelist
            stripIgnoreTagBody: ["script"], // the script tag is a special case, we need
            // to filter out its content
          });
          // console.log(comment);
          // return res.status(200).json(comment);
          if (!isEmpty(comment)) {
            commentData = {
              userId: req.user.id,
              postId: req.params.id,
              comment,
            };
            // return res.status(404).json(commentData);
            const totalComment = ++checkPost.commentsCount;
            const addComment = await db.Comment.create(commentData);
            const updatePosts = await db.Post.update(
              { commentsCount: totalComment },
              { where: { id: req.params.id } }
            );
            return res.status(200).json(updatePosts);
          } else {
            errors.invalidComment = "Please enter a comment";
            return res.status(400).json(errors);
          }
        } else {
          errors.noPosts = "Invalid Post";
          return res.status(400).json(errors);
        }
      } catch (err) {
        return res.status(400).json(err);
      }
    }
  );
};
