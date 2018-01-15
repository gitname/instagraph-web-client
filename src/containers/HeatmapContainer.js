import { connect } from 'react-redux';
import { incrementActiveYear, decrementActiveYear } from '../action-creators';
import Heatmap from '../components/Heatmap';

const mapStateToProps = (state) => {
  return {
    username: state.username,
    dates: state.dates,
    // FIXME: Dummy data...
    countPerDate: [{
      date: "2017-05-05", count: 1
    }, {
      date: "2018-07-07", count: 2
    }, {
      date: "2018-08-16", count: 3
    }]
  };
};

const mapDispatchToProps = {
  incrementActiveYear,
  decrementActiveYear
};

const HeatmapContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Heatmap);

export default HeatmapContainer;