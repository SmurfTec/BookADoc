/**
 *
 * Warning
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import './styles.css';

function Warning(props) {
  return <label className="warning-msg">{props.message}</label>;
}

Warning.propTypes = {
  message: PropTypes.string
};

export default Warning;
