import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BotMessageWrapper = styled.div`
	width: 90%;
	text-align: right;
	float: right;
	background-color: #000;
	color: #32CD32;
	font-family: Courier New;
	font-size: 70%;
	line-height: 1.3;
`;

export class BotMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <BotMessageWrapper>
				<div key={this.props.msg.key}>{this.props.msg.message}</div>
      </BotMessageWrapper>
    );
  }
}

BotMessage.propTypes = {
  msg: PropTypes.object,
};

export default BotMessage;
