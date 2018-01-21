export const _initialPostsLoadingStatus = false;

export const postsLoadingStatusReducer = (isLoading = _initialPostsLoadingStatus, action) => {
  let nextIsLoading;

  switch (action.type) {
    case 'SET_POSTS_LOADING_STATUS':
      nextIsLoading = action.payload.isLoading;
      break;
    default:
      nextIsLoading = isLoading;
      break;
  }

  return nextIsLoading;
};


export const _initialPostsLoadingErrorStatus = false;

export const postsLoadingErrorStatusReducer = (errorOccurred = _initialPostsLoadingErrorStatus, action) => {
  let nextErrorOccurred;

  switch (action.type) {
    case 'SET_POSTS_LOADING_ERROR_STATUS':
      nextErrorOccurred = action.payload.errorOccurred;
      break;
    default:
      nextErrorOccurred = errorOccurred;
      break;
  }

  return nextErrorOccurred;
};

export const _clonePosts = (posts) => {
  const postsClone = {};
  Object.keys(posts).forEach((username) => {
    if (!postsClone.hasOwnProperty(username)) {
      postsClone[username] = {};
    }
    Object.keys(posts[username]).forEach((year) => {
      postsClone[username][year] = posts[username][year].map((post) => {
        return {...post};
      });
    });
  });
  return postsClone;
};

export const _initialPosts = {};

export const postsReducer = (posts = _initialPosts, action) => {
  let nextPosts = {};

  switch (action.type) {
    case "UPDATE_POSTS_CACHE":
      const payload = action.payload;
      nextPosts = _clonePosts(posts);
      if (!nextPosts.hasOwnProperty(payload.username)) {
        nextPosts[payload.username] = {};
      }
      nextPosts[payload.username][payload.year] = payload.posts.map((post) => {
        return {...post};
      });
      console.log(`Cache updated: Stored ${payload.posts.length} posts by ${payload.username} dated ${payload.year}.`);
      break;
    default:
      nextPosts = posts;
      break;
  }

  return nextPosts;
};

export default postsReducer;