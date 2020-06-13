const Validator = require("validator");
const isEmpty = require("./is-empty");
const differenceInDays = require("date-fns/differenceInDays");
const parseISO = require("date-fns/parseISO");

// console.log(typeof isEmpty);
module.exports = function validateExpInput(data) {
  let errors = {};
  const moreFileds = ["title", "company", "location"];
  data.joinDate = !isEmpty(data.joinDate) ? data.joinDate : "";

  // data.email = !isEmpty(data.email) ? data.email : "";

  moreFileds.map((field) => {
    data[field] = !isEmpty(data[field]) ? data[field] : "";
  });

  moreFileds.map((field) => {
    if (Validator.isEmpty(data[field])) {
      // errors[field.toLowerCase()] = `${field} is required`;
      errors[field] = `${field.charAt(0).toUpperCase() +
        field.slice(1)} is required`;
    }
  });

  if (!Validator.isISO8601(data.joinDate)) {
    errors.joinDate = "Enter a valid Date";
  }

  if (data.current === false) {
    let dateLeft = parseISO(data.relieveDate);
    let dateRight = parseISO(data.joinDate);
    const diffDate = differenceInDays(dateLeft, dateRight);
    if (diffDate < 0) {
      errors.relieveDate = "To Date should be greater the from Date";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
