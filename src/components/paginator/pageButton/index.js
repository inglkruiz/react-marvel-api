import React from 'react';
import PropTypes from 'prop-types';

const PageButton = (props) => (
  <li className={props.current === props.page ? 'active': ''}>
    <a role="button" onClick={() => props.clickHandler(props.page)}>{props.page}</a>
  </li>
);

PageButton.propTypes = {
  page: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  clickHandler: PropTypes.func,
};

PageButton.defaultProps = {
  clickHandler: () => {},
};

export default PageButton;