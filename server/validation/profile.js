const Validator = require("validator");
const isEmpty = require("./is-empty");

// console.log(typeof isEmpty);
// module.exports = function validateProfileInput(data) {
function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  // data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 40 chars.";
  }

  const moreFileds = ["Handle", "Company", "Location"];
  moreFileds.map((field) => {
    if (Validator.isEmpty(data[field.toLowerCase()])) {
      errors[field.toLowerCase()] = `${field} is required`;
      // errors[field] = `${field.charAt(0).toUpperCase()+field.slice(1)} is required`;
    }
  });

  // validating all urls field value
  const validUrls = ["Website", "Facebook", "Twitter", "Linkedin"];
  validUrls.map((url) => {
    if (!isEmpty(data[url.toLowerCase()])) {
      if (
        !Validator.isURL(data[url.toLowerCase()].trim(), {
          require_protocol: true,
        })
      ) {
        errors[url.trim().toLowerCase()] = `${url} need to be a valid url`;
      }
    }
  });

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = validateProfileInput;
