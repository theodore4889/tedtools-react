import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router';

const BotMessageWrapper = styled.div`
  width: 90%;
  text-align: right;
  float: right;
  background-color: #000;
  color: #32CD32;
  font-family: Courier New;
  font-size: 30px;;
  line-height: 1.3;
`;

export class BotMessage extends Component {
  render() {
    return (
      <BotMessageWrapper>
        {this.props.msg.message}
      </BotMessageWrapper>
    );
  }
}

BotMessage.propTypes = {
  msg: PropTypes.object,
};

export default BotMessage;
