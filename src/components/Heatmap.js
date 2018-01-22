import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Dimmer, Header, Icon, Loader, Message, Popup, Segment } from 'semantic-ui-react';
import CalendarHeatmap from 'react-calendar-heatmap';

import "./Heatmap.css";

// Instagram launched during the year of 2010.
const instagramLaunchYear = 2010;

export const _pluralize = (singular, count) => {
  return (count === 1) ? singular : `${singular}s`;
};

const getClassNameForValue = (value) => {
  let className = "color-github-0";
  if (value !== null) {
    if (value.count < 4) {
      className = `color-github-${value.count}`;
    } else {
      className = "color-github-4"
    }
  }
  return className;
};

const getTitleForValue = (value) => {
  let title = "No posts";
  if (value !== null) {
    title = `${value.count} ${_pluralize('post', value.count)} on ${value.date}`;
  }
  return title;
};

const getTooltipDataAttributeForValue = (value) => {
  const attribute = {};
  attribute["data-tooltip"] = "No posts";
  if (value.date !== null && value.count !== null) {
    attribute["data-tooltip"] = `${value.count} ${_pluralize('post', value.count)} on ${value.date}`;
  }
  return attribute;
};

const transformDayReactElementIntoPopupComponent = (dayReactElement) => {
  return (
    <Popup
      className="Heatmap-Popup"
      content={dayReactElement.props["data-tooltip"]}
      inverted
      key={dayReactElement.key}
      position="top center"
      size="small"
      trigger={dayReactElement}
    />
  );
};

const Heatmap = (props) => {
  const {
    countPerDate,
    username,
    dates: {
      activeYear,
      activeYearFirstMs,
      activeYearFinalMs,
      naturalYear
    },
    isLoading,
    errorOccurred,
    setActiveYearAndGetPosts
  } = props;

  const previousActiveYear = activeYear - 1;
  const enableDecrementActiveYearButton = (previousActiveYear >= instagramLaunchYear);

  const nextActiveYear = activeYear + 1;
  const enableIncrementActiveYearButton = (nextActiveYear <= naturalYear);

  const profileLink = (
    <a href={`https://www.instagram.com/${username}`}
       title={`Visit ${username}'s Instagram profile`}>
      {username}
    </a>
  );

  return (
    <Container className="Heatmap">
      <Dimmer.Dimmable as={Segment}>

        <Dimmer inverted active={isLoading || errorOccurred}>
          <Segment basic>
            <Message icon error={errorOccurred} hidden={!errorOccurred}>

              <Icon name="x" className="hidden-on-phone" />
              <Message.Content>
                <Message.Header>
                  Uh-oh! (Instagrief)
                </Message.Header>
                <p>
                  We failed to build a heatmap for {profileLink}&apos;s profile. You can try again using a different Instagram username, or try this one again later.
                </p>
              </Message.Content>

            </Message>
          </Segment>
        </Dimmer>

        <Loader indeterminate active={isLoading}>Loading</Loader>

        <Header size="large" textAlign="center" className="Heatmap-Header">
          <Button
            basic
            floated="right"
            className="Heatmap-YearButton"
            disabled={!enableIncrementActiveYearButton}
            onClick={() => setActiveYearAndGetPosts(nextActiveYear)}>
            {nextActiveYear}
            <Icon name="chevron right" />
          </Button>

          <Button
            basic
            floated="left"
            className="Heatmap-YearButton"
            disabled={!enableDecrementActiveYearButton}
            onClick={() => setActiveYearAndGetPosts(previousActiveYear)}>
            <Icon name="chevron left" />
            {previousActiveYear}
          </Button>

          <Header.Content>
            {`${username}'s Heatmap`}
          </Header.Content>

          <Header.Subheader className="Heatmap-Subheader">
            {activeYear}
          </Header.Subheader>
        </Header>

        <CalendarHeatmap
          startDate={activeYearFirstMs}
          endDate={activeYearFinalMs}
          showOutOfRangeDays={false}
          showWeekdayLabels={true}
          gutterSize={2}
          values={countPerDate}
          classForValue={getClassNameForValue}
          titleForValue={getTitleForValue}
          tooltipDataAttrs={getTooltipDataAttributeForValue}
          transformDayElement={transformDayReactElementIntoPopupComponent}
        />

      </Dimmer.Dimmable>
    </Container>
  );
};

Heatmap.propTypes = {
  username: PropTypes.string.isRequired,
  dates: PropTypes.shape({
    activeYear: PropTypes.number.isRequired,
    naturalYear: PropTypes.number.isRequired,
    activeYearFirstMs: PropTypes.number.isRequired,
    activeYearFinalMs: PropTypes.number.isRequired
  }).isRequired,
  countPerDate: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired
    })
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorOccurred: PropTypes.bool.isRequired,
  setActiveYearAndGetPosts: PropTypes.func.isRequired
};

export default Heatmap;