import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const UserMessageWrapper = styled.div`
	width: 90%;
	text-align: left;
	float: left;
	color: #FFF;
	font-family: Helvetica Neue;
  font-weight: normal;
  line-height: 1.3;
`;

export class UserMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <UserMessageWrapper>
				<div key={this.props.msg.key}>{this.props.msg.message}</div>
      </UserMessageWrapper>
    );
  }
}

UserMessage.propTypes = {
  msg: PropTypes.object,
};

export default UserMessage;
