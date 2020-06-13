const Validator = require("validator");
const isEmpty = require("./is-empty");

// console.log(typeof isEmpty);
module.exports = function validateEduInput(data) {
  let errors = {};
  const moreFileds = ["school", "degree", "fieldOfStudy", "joinDate"];

  moreFileds.map(field => {
    data[field] = !isEmpty(data[field]) ? data[field] : "";
  });

  moreFileds.map(field => {
    if (Validator.isEmpty(data[field])) {
      // errors[field.toLowerCase()] = `${field} is required`;
      errors[field] = `${field.charAt(0).toUpperCase() +
        field.slice(1)} is required`;
    }
  });

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
