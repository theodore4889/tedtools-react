import React, { Component } from 'react';
import styled from 'styled-components';

const ChatboxMessagesWrapper = styled.div`

`;

export default class ChatboxMessages extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: this.props.messages
    };

    //this.addMessage = this.addMessage.bind(this);
  }

  render(){
    if (this.props.messages !== this.state.messages) {
      this.state = {
        messages: this.props.messages
      };
    }

    return (
        <ChatboxMessagesWrapper>
          <table>
            <tbody>
              {this.state.messages.map((r) => (
                <tr key={r.key}>
                    <td>{r.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ChatboxMessagesWrapper>
    );
  }
}
