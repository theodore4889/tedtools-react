/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
//import posed from 'react-pose';
import Typed from 'typed.js';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
// import H1 from 'components/H1';
import WallpaperPhoto from 'images/nyc.jpg';

// import Greeting from './Greeting';
import H1 from './H1.js';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import ChatboxMessages from './ChatboxMessages';

const ChatboxContainer = styled.div`
  background-color: rgb(50,50,50,0.7);
  min-width: 67%;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 3em;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  justify-content: center;
`;

const Wallpaper = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${props => `url(${props.src})`};
  background-color: black; /* fallback color */
  background-position: center;
  background-size: cover;
`;

const Greeting = styled.div`
  min-width: 100%;
  color: #FFF;
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

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    this.state = {
      activeMessage: '...',
      messages: []
    }

    this.submitResponse = this.submitResponse.bind(this);
  }

  componentDidMount() {

    const options = {
      strings: ['Hello. How can I help you?'],
      typeSpeed: 40
    };

    // this.el refers to the <span> in the render() method
    this.typed = new Typed(this.el, options);
  }

  componentWillUnmount() {
    // Make sure to destroy Typed instance on unmounting to prevent memory leaks
    this.typed.destroy();
  }

  submitResponse(e){
    if (e.key === 'Enter') {
      let key = Math.random().toString(36).substr(2, 9);
      this.setState(prevState => ({
        messages:[...prevState.messages, {'key': key, 'type': 'bot', 'message': this.state.activeMessage}],
      }), this.typed.reset(self));

      console.log('messages',this.state.messages);

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
          <ChatboxMessages messages={this.state.messages}/>
          <Greeting>
            <H1 className="display-3">
            <div className="type-wrap">
              <span style={{ whiteSpace: 'pre' }} ref={(el) => { this.el = el; }} />
            </div>
            </H1>
          </Greeting>
          <Input type="text" placeholder="Enter your response here..." onKeyPress={this.submitResponse} autoFocus/>
        </ChatboxContainer>
      </div>
    );
  }
}

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
