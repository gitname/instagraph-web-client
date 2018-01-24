import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import TitleBar from './TitleBar';
import HeatmapContainer from '../containers/HeatmapContainer';
import UsernameFormContainer from '../containers/UsernameFormContainer';

// Define this component's style rules using regular CSS; since this
// component's style rules utilize media queries, which are not
// supported by inline styles.
//
import "./App.css";

// Define the URL to which the GitHub button in the title bar popup will link.
const githubUrl = "https://github.com/gitname/instagraph-web-client";

// Define the URL to which the Tweet button in the title bar popup will link.
const tweetUrl = "https://twitter.com/intent/tweet"
  + "?text=" + encodeURIComponent("Just Instagraphed my Instagram profile with Instagraph!")
  + "&url=" + encodeURIComponent(document.URL)
  + "&hashtags=" + encodeURIComponent(["data", "heatmap", "prettycolors"].join(","));

const App = (props) => {
  const {setUsernameResetActiveYearAndGetPosts, username} = props;

  return (
    <div>
      <TitleBar
        title="Instagraph"
        icon={{
          name: "hashtag",
          color: "purple"
        }}
        githubUrl={githubUrl}
        tweetUrl={tweetUrl}
      />

      <Container textAlign="center" className="UsernameFormContainer-Container">
        <UsernameFormContainer
          autoFocus
          onSubmit={(values) => {
            setUsernameResetActiveYearAndGetPosts(values.username);
          }}
        />
      </Container>

      {
        username !== "" &&
        <HeatmapContainer />
      }
    </div>
  );
};

App.propTypes = {
  setUsernameResetActiveYearAndGetPosts: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
};

export default App;
