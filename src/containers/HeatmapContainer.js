import { connect } from 'react-redux';
import { setActiveYearAndGetPosts } from '../action-creators';
import { getStandardizedUsername } from "../lib/helpers";
import Heatmap from '../components/Heatmap';

const convertMsTimestampToDateStr = (msTimestamp) => {
  const date = new Date(msTimestamp);
  const dateStr = date.getUTCFullYear()
    + "-" + ("0" + (date.getUTCMonth() + 1)).slice(-2)
    + "-" + ("0" + date.getUTCDate()).slice(-2);
  return dateStr;
};

const indexOfObjectHavingDate = (dateStr, arrayOfObjects) => {
  let itsIndex = -1;
  for (let i = 0; i < arrayOfObjects.length; i++) {
    if (arrayOfObjects[i].hasOwnProperty('date') && arrayOfObjects[i].date === dateStr) {
      itsIndex = i;
      break;
    }
  }
  return itsIndex;
};

const mapStateToProps = (state) => {
  const countPerDate = [];
  const stdUsername = getStandardizedUsername(state.username);
  if (state.posts.hasOwnProperty(stdUsername) && state.posts[stdUsername].hasOwnProperty(state.dates.activeYear)) {
    state.posts[stdUsername][state.dates.activeYear].forEach((post) => {
      const dateStr = convertMsTimestampToDateStr(post.msTimestamp);
      const index = indexOfObjectHavingDate(dateStr, countPerDate);
      if (index === -1) {
        countPerDate.push({date: dateStr, count: 1});
      } else {
        countPerDate[index].count += 1;
      }
    });
  }

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