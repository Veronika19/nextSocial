const Validator = require("validator");
const isEmpty = require("./is-empty");

// console.log(typeof isEmpty);
module.exports = function validateUpPassInput(data) {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required.";
  }

  if (
    data.password.length &&
    !Validator.isLength(data.password, { min: 6, max: 20 })
  ) {
    errors.password = "Password must be between 6 and 20 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Password is required.";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password must match.";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
