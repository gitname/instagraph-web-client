import { _pluralize } from "./Heatmap";

describe("_pluralize", function () {

  test("refers to zero of something as zero 'things'", () => {
    expect(_pluralize("thing", 0)).toEqual("things");
  });

  test("refers to one of something as one 'thing'", () => {
    expect(_pluralize("thing", 1)).toEqual("thing");
  });

  test("refers to two of something as two 'things'", () => {
    expect(_pluralize("thing", 2)).toEqual("things");
  });

});