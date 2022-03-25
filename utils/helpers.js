// export a fxn to help test to pass; Moment not used b/c we don't need a lot of utility around date & time manipulation
module.exports = {
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },
};
