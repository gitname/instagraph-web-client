export const _getFirstMsOfYear = (year) => {
  return Date.UTC(year, 0, 1, 0, 0, 0, 0); // Jan. 1, YYYY, at 00:00:00.000 UTC in milliseconds
};

export const _getFinalMsOfYear = (year) => {
  return Date.UTC(year, 11, 31, 23, 59, 59, 999); // Dec. 31, YYYY, at 23:59:59.999 UTC in milliseconds
};

const _naturalYear = (() => {
  return new Date().getUTCFullYear();
})();

const _initialDates = {

  // The year that is in focus on the calendar heatmap.
  activeYear: _naturalYear,

  // A millisecond timestamp representing the first millisecond of the active year.
  activeYearFirstMs: _getFirstMsOfYear(_naturalYear),

  // A millisecond timestamp representing the final millisecond of the active year.
  activeYearFinalMs: _getFinalMsOfYear(_naturalYear),

  // The year in the real world, independent of the heatmap state.
  naturalYear: _naturalYear

};

const datesReducer = (dates = _initialDates, action) => {
  let nextDates,
    nextActiveYear;

  switch (action.type) {
    case "INCREMENT_ACTIVE_YEAR":
      nextActiveYear = dates.activeYear + 1;
      nextDates = {
        ...dates,
        activeYear: nextActiveYear,
        activeYearFirstMs: _getFirstMsOfYear(nextActiveYear),
        activeYearFinalMs: _getFinalMsOfYear(nextActiveYear)
      };
      break;
    case "DECREMENT_ACTIVE_YEAR":
      nextActiveYear = dates.activeYear - 1;
      nextDates = {
        ...dates,
        activeYear: nextActiveYear,
        activeYearFirstMs: _getFirstMsOfYear(nextActiveYear),
        activeYearFinalMs: _getFinalMsOfYear(nextActiveYear)
      };
      break;
    default:
      nextDates = dates;
      break;
  }

  return nextDates;
};

export default datesReducer;