'use strict';
const formatDate = function formatDates () {
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; // months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const newdate = year + '/' + month + '/' + day;
  return newdate;
};

module.exports = formatDate;
