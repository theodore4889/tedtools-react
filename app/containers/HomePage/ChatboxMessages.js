import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ChatboxMessagesWrapper = styled.div`

`;

export class ChatboxMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages,
    };

    // this.addMessage = this.addMessage.bind(this);
  }

  render() {
    if (this.props.messages !== this.state.messages) {
      // console.log("props:", this.props.messages)
      this.state = {
        messages: this.props.messages,
      };
    }

    return (
      <ChatboxMessagesWrapper>
        <table>
          <tbody>
            {this.state.messages.map(msg => (
              <tr key={msg.key}>
                <td>{msg.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ChatboxMessagesWrapper>
    );
  }
}

ChatboxMessages.propTypes = {
  messages: PropTypes.array,
};

export default ChatboxMessages;
