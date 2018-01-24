import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Menu, Popup } from 'semantic-ui-react';

const styles = {
  Menu: {
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    borderRadius: 0
  }
};

const TitleBar = (props) => (
  <Menu size="massive" widths={1} style={styles.Menu}>
    <Menu.Item style={{fontFamily: "Pacifico, cursive"}}>
      <Popup
        on="click"
        position="bottom center"
        style={{marginTop: "2em"}}
        trigger={
          <div style={{cursor: "pointer"}}>
            <Icon name={props.icon.name} color={props.icon.color} />
            {props.title}
          </div>
        }
      >
        <Popup.Content>
          <Button
            as="a"
            color="black"
            content="Fork on GitHub"
            fluid
            href={props.githubUrl}
            icon="fork"
            size="mini"
            target="_blank"
          />
          <Button
            as="a"
            color="twitter"
            content="Share on Twitter"
            fluid
            href={props.tweetUrl}
            icon="twitter"
            size="mini"
            style={{marginTop: "1em"}}
            target="_blank"
          />
        </Popup.Content>
      </Popup>
    </Menu.Item>
  </Menu>
);

TitleBar.propTypes = {
  githubUrl: PropTypes.string.isRequired,
  icon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }).isRequired,
  title: PropTypes.string.isRequired,
  tweetUrl: PropTypes.string.isRequired
};

export default TitleBar;