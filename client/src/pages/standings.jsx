import '../config';

import React, { Component } from 'react';

import Head from 'next/head';
import Header from '../components/header';
import OverallLeaderboard from '../components/overall-leaderboard';
import PropTypes from 'prop-types';
import StandingsMenu from '../components/standings-menu';
import VerifyAuthentication from '../components/verify-authentication';
import { connect } from 'react-redux';

class Standings extends Component {
  constructor(props) {
    super(props);
    console.log('/standings');
  }

  render() {
    const { segments } = this.props;
    return (
      <>
        <Head>
          <title>{ global.config.i18n.siteTitle.en }</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main>
          <VerifyAuthentication />
          <div className="container mb-6 mt-12 mx-auto">
            <h1 className="font-bold text-5xl text-center">Standings</h1>
          </div>
          <StandingsMenu
            segments = {segments}
          />
          <OverallLeaderboard />
        </main>
      </>
    );
  }
}

Standings.propTypes = {
  isAuthenticated: PropTypes.bool,
  isAuthenticatedError: PropTypes.bool,
  segments: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => {
  const {
    appData,
  } = state;
  const {
    segments,
  } = appData;
  return {
    segments,
  };
};

export default connect(mapStateToProps)(Standings);
