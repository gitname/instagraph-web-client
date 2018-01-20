import { getIdOfUsersOldestCachedPostCreatedAfterYear } from "./helpers";

const setUsername = (username) => {
  return {
    type: "SET_USERNAME",
    payload: {username}
  }
};

const setActiveYear = (year) => {
  return {
    type: "SET_ACTIVE_YEAR",
    payload: {year}
  };
};

const cachePosts = (username, year, posts) => {
  return {
    type: "UPDATE_POSTS_CACHE",
    payload: {username, year, posts}
  };
};

const setPostsLoadingStatus = (isLoading) => {
  return {
    type: "SET_POSTS_LOADING_STATUS",
    payload: {isLoading}
  };
};

const setPostsLoadingErrorStatus = (errorOccurred) => {
  return {
    type: "SET_POSTS_LOADING_ERROR_STATUS",
    payload: {errorOccurred}
  };
};

// TODO: Consider resetting the activeYear to the naturalYear when the username changes.

export const setUsernameAndGetPosts = (username) => {
  return (dispatch, getState) => {
    dispatch(setUsername(username));
    dispatch(getPosts(username, getState().dates.activeYear));
  };
};

export const setActiveYearAndGetPosts = (year) => {
  return (dispatch, getState) => {
    dispatch(setActiveYear(year));
    dispatch(getPosts(getState().username, year));
  };
};

const getPosts = (username, year) => {
  return (dispatch, getState) => {
    dispatch(setPostsLoadingErrorStatus(false));

    // If the post cache does not already contain the posts for this user
    // and year, fetch those posts from the internet and cache them.
    const postCache = getState().posts;
    if (!(postCache.hasOwnProperty(username) && postCache[username].hasOwnProperty(year))) {
      console.log(`Cache miss: ${username} (${year}).`);
      dispatch(setPostsLoadingStatus(true));

      // Get the ID of the oldest cached post associated with this username,
      // created after the subject year.
      const idOfUsersOldestCachedPostCreatedAfterYear = getIdOfUsersOldestCachedPostCreatedAfterYear(postCache, username, year);
      // Fetch the posts associated with this username and created during
      // this year.
      //
      // By seeding our fetching with the ID of the oldest cached post
      // associated with this username, we can avoid fetching posts that are
      // already represented in the post cache.
      fetchPosts(username, year, idOfUsersOldestCachedPostCreatedAfterYear)
        .then((postsToCache) => {
          dispatch(cachePosts(username, year, postsToCache));
        })
        .catch((exception) => {
          console.log(exception.message);
          dispatch(setPostsLoadingErrorStatus(true));
        }).finally(() => {
        dispatch(setPostsLoadingStatus(false));
      });
    } else {
      console.log(`Cache hit: ${username} (${year}).`);
    }
  };
};

/**
 * Fetch all posts associated with `username` created during `year`, beginning our fetch with `maxId`.
 *
 * Note: this is a recursive function.
 *
 * @param username
 * @param year
 * @param maxId
 * @return {Promise<any>}
 */
const fetchPosts = (username, year, maxId = "") => {
  // Return a Promise that will settle to either an array of posts or an exception.
  return fetch(`https://www.instagram.com/${username}/?__a=1&max_id=${maxId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch. HTTP status: [${response.status}] ${response.statusText}`);
      }
      return response.json();
    })
    .then((json) => {
      // Process the posts we fetched.
      //
      // If a given fetched post was created within the subject year, add a
      // representation of it (i.e. its ID and millisecond timestamp) to the
      // array of posts we want to cache.
      const postsToCache = [];
      const fetchedPosts = json.user.media.nodes;
      let fetchedAllPostsFromYear = false;
      for (let i = 0; i < fetchedPosts.length; i++) {
        const fetchedPost = fetchedPosts[i];
        //console.log(`Processing fetched post`, fetchedPost);
        const {id, date} = fetchedPost;
        const msTimestamp = date * 1000;
        const yearPosted = (new Date(msTimestamp)).getUTCFullYear();
        if (yearPosted === year) {
          postsToCache.push({id, msTimestamp});
        } else if (yearPosted < year) {
          fetchedAllPostsFromYear = true;
        }
      }

      // Get the ID of the final (i.e. oldest) post in this batch. We will
      // use that ID to seed a subsequent fetch.
      const idOfOldestFetchedPost = (fetchedPosts.length > 0) ? fetchedPosts.slice(-1)[0].id : "";

      // Once we encounter a post created before the subject year, then we have
      // fetched all posts created during the subject year and can stop
      // fetching. Also, if there are no more posts available to fetch, we can
      // stop fetching.
      const morePostsAreFetchable = json.user.media.page_info.has_next_page;
      if (!fetchedAllPostsFromYear && morePostsAreFetchable) {
        return fetchPosts(username, year, idOfOldestFetchedPost)
          .then((morePostsToCache) => {
            return postsToCache.concat(morePostsToCache);
          });
      } else {
        return postsToCache;
      }
    });
};
