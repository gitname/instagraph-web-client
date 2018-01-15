import datesReducer, { _getFirstMsOfYear, _getFinalMsOfYear } from "./datesReducer";

describe("_getFirstMsOfYear", function () {

  test("returns a millisecond timestamp representing the first millisecond of the year passed in", () => {
    expect(_getFirstMsOfYear(2018)).toBe(1514764800000); // Reference: https://www.epochconverter.com (UTC)
  });

});

describe("_getFinalMsOfYear", function () {

  test("returns a millisecond timestamp representing the final millisecond of the year passed in", () => {
    expect(_getFinalMsOfYear(2018)).toBe(1546300799999);
  });

});

describe("datesReducer", function () {

  let dates;

  beforeEach(() => {
    dates = {
      activeYear: 2018,
      activeYearFirstMs: _getFirstMsOfYear(2018),
      activeYearFinalMs: _getFinalMsOfYear(2018),
      naturalYear: 2018
    };
  });

  test("increments the active year by 1", () => {
    const action = {
      type: "INCREMENT_ACTIVE_YEAR"
    };
    const expectedNextDates = {
      activeYear: 2019,
      activeYearFirstMs: _getFirstMsOfYear(2019),
      activeYearFinalMs: _getFinalMsOfYear(2019),
      naturalYear: 2018
    };
    expect(datesReducer(dates, action)).toEqual(expectedNextDates);
  });

  test("decrements the active year by 1", () => {
    const action = {
      type: "DECREMENT_ACTIVE_YEAR"
    };
    const expectedNextDates = {
      activeYear: 2017,
      activeYearFirstMs: _getFirstMsOfYear(2017),
      activeYearFinalMs: _getFinalMsOfYear(2017),
      naturalYear: 2018
    };
    expect(datesReducer(dates, action)).toEqual(expectedNextDates);
  });

});