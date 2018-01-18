import { getIdOfUsersOldestCachedPostCreatedAfterYear } from "./helpers";

describe("getIdOfUsersOldestCachedPostCreatedAfterYear", function () {
  let postCache;

  beforeEach(() => {
    postCache = {
      alice: {
        2015: [{id: "alice2015_A", msTimestamp: 201503}, {id: "alice2015_B", msTimestamp: 201502}, {id: "alice2015_C", msTimestamp: 201501}],
        // (2016)
        2017: [{id: "alice2017_A", msTimestamp: 201703}, {id: "alice2017_B", msTimestamp: 201702}, {id: "alice2017_C", msTimestamp: 201701}],
        2018: [],
        2019: [{id: "alice2019_A", msTimestamp: 201903}, {id: "alice2019_B", msTimestamp: 201902}, {id: "alice2019_C", msTimestamp: 201901}],
        2020: [],
      }
    };
  });

  test("returns ID of oldest cached post created after year (in adjacent year)", () => {
    expect(getIdOfUsersOldestCachedPostCreatedAfterYear(postCache, "alice", 2016)).toEqual("alice2017_C");
  });

  test("returns ID of oldest cached post created after year (in non-adjacent year)", () => {
    expect(getIdOfUsersOldestCachedPostCreatedAfterYear(postCache, "alice", 2017)).toEqual("alice2019_C");
  });

  test("returns empty string if cache contains no posts created after year", () => {
    expect(getIdOfUsersOldestCachedPostCreatedAfterYear(postCache, "alice", 2019)).toEqual("");
  });

});