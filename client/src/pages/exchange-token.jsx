import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import {
  accessTokenError,
  authenticate,
  initialize,
} from '../actions';
import '../config';
import { getAccessToken } from '../api/strava';
import RedirectComponent from '../components/redirect';

class ExchangeToken extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    getAccessToken()
      .then((data) => {
        dispatch(authenticate(data))
          .then(dispatch(initialize(data)));
      })
      .catch(() => {
        dispatch(accessTokenError());
      });
  }

  render() {
    const {
      isAuthenticated,
      isAuthenticatedError,
      isInitializationComplete,
    } = this.props;
    const redirectToAppCondition = isAuthenticated && isInitializationComplete;
    const redirectAccessDeniedCondition = !isAuthenticated && isAuthenticatedError;
    return (
      <>
        <Head>
          <title>Redirecting...</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <div className="container mx-auto">
            <p>Redirecting...</p>
          </div>
          {redirectToAppCondition
            && (
              <RedirectComponent
                route="/standings"
              />
            )}
          {redirectAccessDeniedCondition
            && (
              <RedirectComponent
                route="/"
              />
            )}
        </main>
      </>
    );
  }
}

ExchangeToken.propTypes = {
  dispatch: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  isAuthenticatedError: PropTypes.bool,
  isInitializationComplete: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const {
    appStatus,
    userStatus,
  } = state;
  const {
    isAuthenticated,
    isAuthenticatedError,
  } = userStatus;
  const { isInitializationComplete } = appStatus;
  return {
    isAuthenticated,
    isAuthenticatedError,
    isInitializationComplete,
  };
};

export default connect(mapStateToProps)(ExchangeToken);
