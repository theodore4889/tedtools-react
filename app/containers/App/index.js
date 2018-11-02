/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NumbersQuiz from 'containers/NumbersQuiz/Loadable';
import IpGeolocator from 'containers/IpGeolocator/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

const greenTheme = {
  primary: '#32CD32',
  bg: '#000'
}

const AppWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const BodyWrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
  background-color: #FFF;
`;
//  padding: 0 16px;
//  max-width: calc(768px + 16px * 2);

export default function App() {
  return (
    <ThemeProvider theme={greenTheme}>
    <AppWrapper>
      <Helmet
        titleTemplate="%s | Ted Tools"
        defaultTitle="Ted Tools"
      >
        <meta name="description" content="Tech Tools by Ted" />
      </Helmet>
      <Header />
      <BodyWrapper>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/features" component={FeaturePage} />
          <Route path="/numbers-quiz" component={NumbersQuiz} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </BodyWrapper>
      <Footer />
    </AppWrapper>
    </ThemeProvider>
  );
}
