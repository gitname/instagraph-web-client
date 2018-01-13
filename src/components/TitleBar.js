import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu } from 'semantic-ui-react';

const styles = {
  Menu: {
    borderTop: "none",
    borderRight: "none",
    borderLeft: "none",
    borderRadius: 0
  },
  MenuItem: {
    fontFamily: "Pacifico, cursive"
  }
};

const TitleBar = (props) => (
  <Menu size="massive" widths={1} style={styles.Menu}>
    <Menu.Item style={styles.MenuItem}>
      <Icon name={props.icon.name} color={props.icon.color} />
      {props.title}
    </Menu.Item>
  </Menu>
);

TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }).isRequired
};

export default TitleBar;