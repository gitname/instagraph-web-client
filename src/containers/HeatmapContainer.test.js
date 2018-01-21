import {
  convertMsTimestampToDateStr,
  getIndexOfObjectHavingDate,
  getCountPerDate
} from "./HeatmapContainer";

describe("convertMsTimestampToDateStr", function () {

  test("returns a string in YYYY-MM-DD format", () => {
    expect(convertMsTimestampToDateStr(1516528131000)).toEqual("2018-01-21");
    expect(convertMsTimestampToDateStr(1516528131000)).not.toEqual("01-21-2018");
    expect(convertMsTimestampToDateStr(1516528131000)).not.toEqual("21-01-2018");
  });

  test("interprets the timestamp as UTC", () => {
    // The first millisecond of the day, according to: https://www.epochconverter.com
    expect(convertMsTimestampToDateStr(1516492800000)).toEqual("2018-01-21");

    // The final millisecond of the day, according to: https://www.epochconverter.com
    expect(convertMsTimestampToDateStr(1516577039999)).toEqual("2018-01-21");
  });

});

describe("getIndexOfObjectHavingDate", function () {

  const countPerDate = [
    {date: "2018-01-20"},
    {date: "2018-01-21"},
    // No object has a `date` of "2018-01-22"
    {date: "2018-01-23"},
    {date: "2018-01-24"}
  ];

  test("returns the index of the qualifying object", () => {
    expect(getIndexOfObjectHavingDate("2018-01-23", countPerDate)).toEqual(2);
  });

  test("returns `-1` if no object qualifies", () => {
    expect(getIndexOfObjectHavingDate("2018-01-22", countPerDate)).toEqual(-1);
  });

});

describe("getCountPerDate", function () {

  const posts = {
    alice: {
      '2017': [
        {msTimestamp: 1485131400000} // 2017-01-23
      ],
      '2018': [
        {msTimestamp: 1516492800000}, // 2018-01-21
        {msTimestamp: 1516492800000}, // 2018-01-21
        {msTimestamp: 1516708800000}, // 2018-01-23
        {msTimestamp: 1516536000000}, // 2018-01-21
        {msTimestamp: 1516276800000}, // 2018-01-18
        {msTimestamp: 1516667400000} // 2018-01-23
      ]
    },
    bobby: {
      '2018': [
        {msTimestamp: 1516492800000}, // 2018-01-21
        {msTimestamp: 1516492800000}, // 2018-01-21
        {msTimestamp: 1516708800000}, // 2018-01-23
        {msTimestamp: 1516536000000}, // 2018-01-21
        {msTimestamp: 1516276800000}, // 2018-01-18
        {msTimestamp: 1516667400000} // 2018-01-23
      ]
    }
  };

  test("returns the correct count per date", () => {
    const expectedCountPerDate = [
      {date: "2018-01-21", count: 3},
      {date: "2018-01-23", count: 2},
      {date: "2018-01-18", count: 1}
    ];
    expect(getCountPerDate(posts, "alice", 2018)).toMatchObject(expectedCountPerDate);
  });

  test("returns an empty array if no posts qualify", () => {
    expect(getCountPerDate(posts, "bobby", 2017)).toMatchObject([]);
    expect(getCountPerDate(posts, "cory", 2018)).toMatchObject([]);
  });

});