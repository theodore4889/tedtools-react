import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const UserMessageWrapper = styled.div`
  width: 90%;
  text-align: left;
  float: left;
  color: #FFF;
  font-family: Helvetica Neue;
  font-size: 30px;
  font-weight: normal;
  line-height: 1.3;
`;

export class UserMessage extends Component {
  render() {
    return (
      <UserMessageWrapper>
        <div>{this.props.msg.message}</div>
      </UserMessageWrapper>
    );
  }
}

UserMessage.propTypes = {
  msg: PropTypes.object,
};

export default UserMessage;
