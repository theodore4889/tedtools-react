/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import { render } from 'react-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
// import Typed from 'typed.js';
// import Typed from 'react-typed';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
// import H1 from 'components/H1';
import WallpaperPhoto from 'images/nyc.jpg';

import H1 from './H1';
// import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import ChatboxMessages from './ChatboxMessages';

/**
 * Instantiate the Watson Conversation Service
 */

// var AssistantV2 = require('watson-developer-cloud/assistant/v2'); // watson sdk
// let AssistantV1 = require('watson-developer-cloud/assistant/v1');

/*
var assistant = new AssistantV2({
  version: process.env.WATSON_VERSION,
  username: process.env.WATSON_USERNAME,
  password: process.env.WATSON_API_KEY,
  url: process.env.WATSON_ASSISTANT_BASE_URL,
});
*/

const Wallpaper = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${props => `url(${props.src})`};
  background-color: black; /* fallback color */
  background-position: center;
  background-size: cover;
`;

const ChatboxContainer = styled.div`
  display: block;
  background-color: rgb(50,50,50,0.7);
  min-width: 67%;
  max-height: 80%;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 3em;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  justify-content: center;
`;

const MessagesContainer = styled.div`
  max-height: 290px;
  overflow-y: scroll;
`;

const Input = styled.input`
  width: 100%;
  border: solid 3px #FFF;
  border-radius: 5px;
  background-color: rbga(0,0,0,0.5);
  color: #FFF;
  font-size: 2em;
  padding: 0.3em;
`;

let sessionId = {};

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      activeMessage: '...',
      messages: [],
      inputValue: '',
    };

    this.submitResponse = this.submitResponse.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.messageAssistant = this.messageAssistant.bind(this);
    this.addMessageToState = this.addMessageToState.bind(this);
  }

  componentDidMount() {
    //this.messageAssistant("Hello.");

    axios.post('/api/watson/assistant/startSession', {})
      .then( resp => {
        sessionId = resp.data.session_id;
        console.log('sessionId:', sessionId);
      })
      .catch( err => {
        console.log(err);
      });

    /*
    const options = {
      strings: ['Hello. How can I help you?'],
      typeSpeed: 40,
    };

    this.typed = new Typed(this.el, options);
 /*
    // this.el refers to the <span> in the render() method
    this.typed = ('#typed',{
      stringsElement: '#typed-strings',
      typeSpeed: 40
    });
    */
  }

  componentWillUnmount() {
    // Make sure to destroy Typed instance on unmounting to prevent memory leaks
    // this.typed.destroy();
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value,
    });
  }

  addMessageToState(message, type){
    let key = Math.random().toString(36).substr(2, 9);
    this.setState(prevState => ({
      messages: [...prevState.messages, { key, type, message }],
      inputValue: '',
    }));
  }

  messageAssistant(message, callback){
    axios.post('/api/watson/assistant/sendMessage', {
        session_id: sessionId,
        text: message,
      })
        .then( resp => {
          console.log('/api/watson/assistant/sendMessage resp', resp);
          const responseMsg = resp.data.output.generic[0].text;

          this.addMessageToState(responseMsg, 'bot');
          if(callback) callback();
        })
        .catch( err => {
          console.log(err);
        });
  }

  submitResponse(e) {
    if (e.key === 'Enter') {
      const message = this.state.inputValue;
      this.addMessageToState(message, 'user');

      // }), this.typed.reset(self));

      // Set processing message

      // Send message to Conversation Bot
      this.messageAssistant(message);

      // this.el refers to the <span> in the render() method
      /*
      const options = {
        strings: ['...'],
        typeSpeed: 40
      };

      this.typed = new Typed(this.el, options);
      */
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Home Page of Ted Lano" />
        </Helmet>

        <Wallpaper src={WallpaperPhoto} />

        <ChatboxContainer>
          <MessagesContainer>
            <H1>
              <ChatboxMessages messages={this.state.messages} />
            </H1>
          </MessagesContainer>

          <Input
            type="text"
            placeholder="Enter your response here..."
            onKeyPress={this.submitResponse}
            value={this.state.inputValue}
            onChange={evt => this.updateInputValue(evt)}
            autoFocus
          />
        </ChatboxContainer>
      </div>
    );
  }
}

/*
<Typed
  strings={['Hello. How may I help you?']}
  typeSpeed={40}
/>
*/
// <p className="lead"><FormattedMessage {...messages.mainQuestion} /></p>

HomePage.propTypes = {
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
