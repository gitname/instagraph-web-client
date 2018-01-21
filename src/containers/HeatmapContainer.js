import { connect } from 'react-redux';
import { setActiveYearAndGetPosts } from '../action-creators';
import { getStandardizedUsername } from "../lib/helpers";
import Heatmap from '../components/Heatmap';

/**
 * Returns a date string in "YYYY-MM-DD" format, corresponding to the UTC
 * millisecond timestamp passed in.
 *
 * @param msTimestamp
 * @return {string}
 */
export const convertMsTimestampToDateStr = (msTimestamp) => {
  const date = new Date(msTimestamp);
  return date.getUTCFullYear()
    + "-" + ("0" + (date.getUTCMonth() + 1)).slice(-2)
    + "-" + ("0" + date.getUTCDate()).slice(-2);
};

/**
 * Returns the index of the first element (in the array passed in) that has a
 * `date` property whose value matches the date string passed in.
 *
 * @param dateStr
 * @param arrayOfObjects
 * @return {number}
 */
export const getIndexOfObjectHavingDate = (dateStr, arrayOfObjects) => {
  let itsIndex = -1;
  for (let i = 0; i < arrayOfObjects.length; i++) {
    if (arrayOfObjects[i].hasOwnProperty('date') && arrayOfObjects[i].date === dateStr) {
      itsIndex = i;
      break;
    }
  }
  return itsIndex;
};

/**
 * Returns an array of objects that describes how many posts are associated
 * with the `username` passed in, for each individual date of the `year` passed
 * in, according to the `posts` object passed in.
 *
 * Each object in the returned array has the following shape:
 * `{date: <string>, count: <number>}`, where the `date` value is in
 * "YYYY-MM-DD" format and `count` value represents the number of posts
 * (associated with `username`) associated with that date.
 *
 * Dates having 0 posts are not represented in the returned array.
 *
 * @param posts
 * @param username
 * @param year
 * @return {Array}
 */
export const getCountPerDate = (posts, username, year) => {
  const countPerDate = [];
  if (posts.hasOwnProperty(username) && posts[username].hasOwnProperty(year)) {
    const subjectPosts = posts[username][year];
    for (let i = 0; i < subjectPosts.length; i++) {
      const subjectPost = subjectPosts[i];
      const dateStr = convertMsTimestampToDateStr(subjectPost.msTimestamp);
      const index = getIndexOfObjectHavingDate(dateStr, countPerDate);
      if (index === -1) {
        countPerDate.push({date: dateStr, count: 1});
      } else {
        countPerDate[index].count += 1;
      }
    }
  }
  return countPerDate;
};

const mapStateToProps = (state) => {
  const stdUsername = getStandardizedUsername(state.username);
  const countPerDate = getCountPerDate(state.posts, stdUsername, state.dates.activeYear);

  return {
    username: state.username,
    dates: state.dates,
    isLoading: state.isLoading,
    errorOccurred: state.errorOccurred,
    countPerDate
  };
};

const mapDispatchToProps = {
  setActiveYearAndGetPosts
};

const HeatmapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Heatmap);

export default HeatmapContainer;