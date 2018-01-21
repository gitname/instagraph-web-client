import { getIdOfUsersOldestCachedPostCreatedAfterYear } from "./helpers";
import { getStandardizedUsername } from "../lib/helpers";

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

const resetActiveYear = () => {
  return (dispatch, getState) => {
    dispatch(setActiveYear(getState().dates.naturalYear));
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

export const setUsernameResetActiveYearAndGetPosts = (username) => {
  return (dispatch, getState) => {
    dispatch(setUsername(username));
    dispatch(resetActiveYear());
    dispatch(getPosts(username, getState().dates.activeYear));
  };
};

export const setActiveYearAndGetPosts = (year) => {
  return (dispatch, getState) => {
    dispatch(setActiveYear(year));
    dispatch(getPosts(getState().username, year));
  };
};

/**
 * If the post cache does not contain posts associated with the username and
 * year passed in, get those posts from the internet and store them in the
 * post cache.
 *
 * @param username
 * @param year
 * @return {function(*, *)}
 */
const getPosts = (username, year) => {
  return (dispatch, getState) => {
    dispatch(setPostsLoadingErrorStatus(false));

    // Get the standardized version of the username.
    //
    // Note: Whenever we access (i.e. read from or write to) the post cache
    // using a given username, we will always use the standardized form of that
    // username. That's so, once the cache contains an entry for that username,
    // we will get a cache hit even if the visitor submits the username using a
    // case that is different from the case they used when the entry was
    // created.
    //
    const stdUsername = getStandardizedUsername(username);

    // If the post cache does not already contain posts associated with this
    // username and year, fetch those posts from the internet and cache them.
    //
    const postCache = getState().posts;
    if (!(postCache.hasOwnProperty(stdUsername) && postCache[stdUsername].hasOwnProperty(year))) {
      console.log(`Cache miss: Found no posts by ${stdUsername} dated ${year}.`);
      dispatch(setPostsLoadingStatus(true));

      // Get the ID of the oldest cached post associated with this username,
      // created after the subject year.
      //
      // Note: By seeding our fetching with the ID of the oldest cached post
      // associated with this username, we can avoid fetching posts that are
      // already represented in the post cache.
      //
      const idOfUsersOldestCachedPostCreatedAfterYear = getIdOfUsersOldestCachedPostCreatedAfterYear(postCache, stdUsername, year);

      // Fetch (from the internet) all the posts associated with this username
      // and created during this year.
      //
      fetchPosts(stdUsername, year, idOfUsersOldestCachedPostCreatedAfterYear)
        .then((postsToCache) => {
          dispatch(cachePosts(stdUsername, year, postsToCache));
          dispatch(setPostsLoadingStatus(false));
        })
        .catch((exception) => {
          console.log(exception.message);
          dispatch(setPostsLoadingErrorStatus(true));
          dispatch(setPostsLoadingStatus(false));
        });
    } else {
      const numRelevantPostsCached = postCache[stdUsername][year].length;
      console.log(`Cache hit: Found ${numRelevantPostsCached} posts by ${stdUsername} dated ${year}.`);
    }
  };
};

/**
 * Fetch all posts associated with `username` created during `year`, beginning
 * our fetch with `maxId`.
 *
 * Note: this is a recursive function.
 *
 * Note: The Instagram URL is not sensitive to the case of the username in it.
 *
 * @param username
 * @param year
 * @param maxId
 * @return {Promise<any>}
 */
const fetchPosts = (username, year, maxId = "") => {
  // Return a Promise that will settle to either an array of posts or an
  // exception.
  //
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
      //
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

      // Get the ID of the final (i.e. oldest) post in this batch. We will use
      // that ID to seed a subsequent fetch.
      //
      const idOfOldestFetchedPost = (fetchedPosts.length > 0) ? fetchedPosts.slice(-1)[0].id : "";

      // Once we encounter a post created before the subject year, we have
      // fetched all posts created during the subject year and can stop
      // fetching. Also, if there are no more posts available to fetch, we can
      // stop fetching.
      //
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
