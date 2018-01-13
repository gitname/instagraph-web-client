import usernameReducer from "./usernameReducer";

describe("usernameReducer", function () {

  let currentUsername,
    newUsername,
    action;

  beforeEach(() => {
    currentUsername = "Alice";
    newUsername = "Bobby";
    action = {
      type: "SET_USERNAME",
      payload: {
        username: newUsername
      }
    };
  });

  test("returns new username for 'SET_USERNAME' action", () => {
    expect(usernameReducer(currentUsername, action)).toBe(newUsername);
  });

  test("returns current username for unrelated action", () => {
    action.type = "DO_UNRELATED_THING";
    expect(usernameReducer(currentUsername, action)).toBe(currentUsername);
  });

});