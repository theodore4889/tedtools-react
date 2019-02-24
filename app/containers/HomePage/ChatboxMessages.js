import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BotMessage from './BotMessage.js';
import UserMessage from './UserMessage.js';

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

  addMessage(msg){
    if(msg.type === 'bot'){
      return <BotMessage msg={msg}></BotMessage>
    }

    return (
      <UserMessage msg={msg}></UserMessage>
    )
  }

  scrollToBottom(){
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
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
        <div style={{ float:"left", clear: "both" }}
          ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </ChatboxMessagesWrapper>
    );
  }
}

ChatboxMessages.propTypes = {
  messages: PropTypes.array,
};

export default ChatboxMessages;
