const Validator = require("validator");
const isEmpty = require("./is-empty");

// console.log(typeof isEmpty);
module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Enter valid email.";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required.";
  }

  if (
    data.password.length &&
    !Validator.isLength(data.password, { min: 6, max: 20 })
  ) {
    errors.password = "Password must be between 6 and 20 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
