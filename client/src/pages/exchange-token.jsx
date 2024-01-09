import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import { authenticate } from '../actions';
import '../config';
import { getAccessToken } from '../api/strava';
import RedirectComponent from '../components/redirect';

class ExchangeToken extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    getAccessToken()
      .then((data) => {
        console.log(data);
        const { athlete } = data;
        const { id } = athlete;
        dispatch(authenticate({ id }));
      })
      .catch(() => {
        console.error('user not found.');
      });
  }

  render() {
    const { isAuthenticated } = this.props;
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
            {isAuthenticated
              && (
                <RedirectComponent />
              )}
          </div>
        </main>
      </>
    );
  }
}

ExchangeToken.propTypes = {
  dispatch: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const { userStatus } = state;
  const {
    isAuthenticated,
    isAuthenticatedError,
  } = userStatus;
  return {
    isAuthenticated,
    isAuthenticatedError,
  };
};

export default connect(mapStateToProps)(ExchangeToken);
