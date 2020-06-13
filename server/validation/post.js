const Validator = require("validator");
const isEmpty = require("./is-empty");

// console.log(typeof isEmpty);
module.exports = function validatePostInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.content = !isEmpty(data.content) ? data.content : "";

  if (!Validator.isLength(data.title, { min: 5, max: 150 })) {
    errors.title = "Title should be between 5 and 150";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title is required.";
  }

  if (!Validator.isLength(data.content, { min: 50 })) {
    errors.content = "Content should be more than 50 words.";
  }

  if (Validator.isEmpty(data.content)) {
    errors.content = "Content is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
