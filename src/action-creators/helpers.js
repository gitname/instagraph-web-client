export const getIdOfUsersOldestCachedPostCreatedAfterYear = (postCache, username, subjectYear) => {
  let oldestCachedPostCreatedAfterSubjectYear = {};
  if (postCache.hasOwnProperty(username)) {
    Object.keys(postCache[username]).forEach((year) => {
      // Check whether this year is after the subject year and whether
      // this year's post array actually contains any posts.
      if (year > subjectYear && postCache[username][year].length > 0) {
        // Only process the last post in the array, since the posts in the
        // array are sorted from newest to oldest.
        //
        // If this is the first post we have processed, or it is older than the
        // oldest one we've processed so far, designate *it* as the oldest one
        // we've processed so far.
        const thisPost = postCache[username][year].slice(-1)[0];
        if (!oldestCachedPostCreatedAfterSubjectYear.hasOwnProperty("id") || thisPost.msTimestamp < oldestCachedPostCreatedAfterSubjectYear.msTimestamp) {
          oldestCachedPostCreatedAfterSubjectYear = thisPost;
        }
      }
    });
  }
  return oldestCachedPostCreatedAfterSubjectYear.hasOwnProperty("id") ? oldestCachedPostCreatedAfterSubjectYear.id : "";
};