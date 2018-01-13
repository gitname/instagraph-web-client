export const _initialUsername = "";

const usernameReducer = (username = _initialUsername, action) => {
  let nextUsername;

  switch (action.type) {
    case 'SET_USERNAME':
      nextUsername = action.payload.username;
      break;
    default:
      nextUsername = username;
      break;
  }

  return nextUsername;
};

export default usernameReducer;