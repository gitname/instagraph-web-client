export const setUsername = (username) => {
  return {
    type: 'SET_USERNAME',
    payload: {
      username
    }
  };
};

export const incrementActiveYear = () => {
  return {
    type: 'INCREMENT_ACTIVE_YEAR'
  }
};

export const decrementActiveYear = () => {
  return {
    type: 'DECREMENT_ACTIVE_YEAR'
  }
};