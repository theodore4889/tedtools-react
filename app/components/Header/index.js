import React from 'react';
import { FormattedMessage } from 'react-intl';

import Wrapper from './Wrapper';
import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Logo from './logo.png';
import messages from './messages';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
        <NavBar>
          <A href="/">
            <Img src={Logo} alt="Ted Tools - Logo" />
          </A>
          <HeaderLink to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/caption-maker">
            <FormattedMessage {...messages.captionMaker} />
          </HeaderLink>
          <HeaderLink to="/numbers-quiz">
            <FormattedMessage {...messages.numbersQuiz} />
          </HeaderLink>
          <HeaderLink to="/ip-geolocator">
            <FormattedMessage {...messages.features} />
          </HeaderLink>
          <HeaderLink to="/features">
            <FormattedMessage {...messages.features} />
          </HeaderLink>
        </NavBar>
      </Wrapper>
    );
  }
}

export default Header;
