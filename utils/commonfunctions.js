// const differenceInDays = require("date-fns/differenceInDays");

// import {
//   parse,
//   differenceInDays,
//   isBefore,
//   isSameDay,
//   startOfDay,
//   format,
//   formatDistance,
// } from "date-fns";

// import i18n from "i18next";

export const stringToSlug = (str) => {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
};

export const toUcFirst = (stringData) => {
  let string = stringData;
  return string[0].toUpperCase() + string.slice(1);
};

export const formatDate = (unformattedDate) => {
  const day = unformattedDate.slice(0, 2);
  const month = unformattedDate.slice(3, 5);
  const year = unformattedDate.slice(6, 10);
  const time = unformattedDate.slice(11);
  return `${year}-${month}-${day}T${time}+05:30`;
};

// export const formatLastUpdated = (unformattedDate) => {
//   return formatDistance(new Date(formatDate(unformattedDate)), new Date(), {
//     locale: LOCALE_SHORTHANDS[i18n.language],
//   });
// };

// export const formatDateAbsolute = (unformattedDate) => {
//   return format(
//     parse(unformattedDate, "dd/MM/yyyy HH:mm:ss", new Date()),
//     "dd MMM, hh:mm b",
//     {
//       locale: LOCALE_SHORTHANDS[i18n.language],
//     }
//   );
// };

// export const formatDayMonth = (unformattedDate) => {
//   return format(parse(unformattedDate, "dd/MM/yyyy", new Date()), "dd MMM", {
//     locale: LOCALE_SHORTHANDS[i18n.language],
//   });
// };

export const formatNumber = (value) => {
  const numberFormatter = new Intl.NumberFormat("en-IN");
  return isNaN(value) ? "-" : numberFormatter.format(value);
};

export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const capitalizeAll = (s) => {
  if (typeof s !== "string") return "";
  const str = s.toLowerCase().split(" ");
  for (let i = 0; i < str.length; i++) {
    str[i] = capitalize(str[i]);
  }
  return str.join(" ");
};

export const abbreviate = (s) => {
  return s.slice(0, 1) + s.slice(1).replace(/[aeiou]/gi, "");
};

export const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

// setting skills of users
export const listSkills = (skills) => {
  return skills
    .slice(1, -1)
    .split(",")
    .map((skill) => {
      return (
        <div
          key={skill}
          className="d-flex flex-wrap justify-content-center align-items-center"
        >
          <div className="p-3">
            <i className="fa fa-check"></i> {skill}
          </div>
        </div>
      );
    });
};
