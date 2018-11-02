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
import { Container, Row, Col, Jumbotron } from 'reactstrap';
import styled from 'styled-components';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import H1 from 'components/H1';
import WallpaperPhoto from 'images/nyc.jpg';

import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Img from './Img';
import Form from './Form';
import Input from './Input';
import Section from './Section';
//import Greeting from './Greeting';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

const ContentWrapper = styled.div`
  min-height: calc(100vh - 55px - 30px);
  transition: all .5s ease-out;
`;

const Content = styled.div`
  min-width: 67%;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
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
  background-color: rgb(50,50,50,0.5);
  min-width: 100%;
  padding: 5em;
  color: #FFF;
  border-radius: 10px;
`;

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  render() {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    return (
      <div>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Home Page of Ted Lano" />
        </Helmet>

        <Wallpaper src={WallpaperPhoto}/>
        <Content>
          <Container fluid>
            <Row>
              <Col>
                <Greeting>
                  <h1 className="display-3"><FormattedMessage {...messages.greeting} /></h1>
                  <p className="lead"><FormattedMessage {...messages.mainQuestion} /></p>
                </Greeting>
              </Col>
            </Row>
          </Container>
        </Content>
      </div>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  repos: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: (evt) => {
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
