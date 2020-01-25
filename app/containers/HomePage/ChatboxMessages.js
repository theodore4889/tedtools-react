import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BotMessage from './BotMessage';
import UserMessage from './UserMessage';

const ChatboxMessagesWrapper = styled.div`
`;

export class ChatboxMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages,
    };

    this.addMessage = this.addMessage.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  addMessage(msg) {
    if (msg.type === 'bot') {
      return <BotMessage key={msg.key} msg={msg}></BotMessage>;
    }

    return (
      <UserMessage key={msg.key} msg={msg}></UserMessage>
    );
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
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
        <div>
          {this.state.messages.map(msg => (
            this.addMessage(msg)
          ))}
        </div>
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={el => { this.messagesEnd = el; }}
        >
        </div>
      </ChatboxMessagesWrapper>
    );
  }
}

ChatboxMessages.propTypes = {
  messages: PropTypes.array,
};

export default ChatboxMessages;
