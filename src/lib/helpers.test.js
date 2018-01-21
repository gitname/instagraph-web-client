import { getStandardizedUsername } from "./helpers";

describe("getStandardizedUsername", function () {

  test("returns lowercase version of username", () => {
    expect(getStandardizedUsername("ALICE")).toEqual("alice");
    expect(getStandardizedUsername("Alice")).toEqual("alice");
    expect(getStandardizedUsername("alice")).toEqual("alice");
    expect(getStandardizedUsername("aLiCe")).toEqual("alice");
  });

  test("returns lowercase version of username containing letters, numbers, periods, and underscores", () => {
    expect(getStandardizedUsername("AB_1.cD")).toEqual("ab_1.cd");
    expect(getStandardizedUsername("AB_1._2c.D")).toEqual("ab_1._2c.d");
  });

});