import '../config';

import React, { Component } from 'react';

import Head from 'next/head';
import PropTypes from 'prop-types';
import RedirectComponent from '../components/redirect';
import { connect } from 'react-redux';
import { getAccessToken } from '../api/strava';
import { persistAccessTokenRepsonse } from '../utils/strava-oauth-utils';
import { persistUserSessionData } from '../actions';
import { updateUserAthleteData } from '../api/brt';

class ExchangeToken extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = {
      authenticationError: false,
      authenticationSuccess: false,
    };
    getAccessToken()
      .then((data) => {
        persistAccessTokenRepsonse(data);
        const { athlete } = data;
        updateUserAthleteData(athlete);
        dispatch(persistUserSessionData(athlete));
        this.setState({ authenticationSuccess: true });
      })
      .catch(() => {
        this.setState({ authenticationError: true });
      });
  }

  render() {
    const {
      authenticationError,
      authenticationSuccess,
    } = this.state;
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
          {authenticationSuccess
            && (
              <RedirectComponent
                route="/standings"
              />
            )}
          {authenticationError
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
};

export default connect(
  null,
  null,
)(ExchangeToken);
