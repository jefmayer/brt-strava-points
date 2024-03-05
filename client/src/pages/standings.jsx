import '../config';

import React, { Component } from 'react';
import {
  getAccessToken,
  getUserId,
} from '../utils/strava-oauth-utils';

import Head from 'next/head';
import Header from '../components/header';
import Leaderboard from '../components/standings/leaderboard';
import PropTypes from 'prop-types';
import StandingsMenu from '../components/standings/standings-menu';
import VerifyAuthentication from '../components/verify-authentication';
import { authenticate } from '../api/brt';
import { connect } from 'react-redux';
import { getDefaultSegmentObj } from '../helpers/segment-helpers';
import { initialize } from '../actions';

class Standings extends Component {
  constructor(props) {
    super(props);
    const selectedSegment = getDefaultSegmentObj();
    this.state = { selectedSegment };
    this.setSelectedSegment = this.setSelectedSegment.bind(this);
    const { dispatch } = props;
    const id = getUserId();
    authenticate(id) // authenticate needs to return athlete data
      .then(() => {
        const token = getAccessToken();
        console.log(`token: ${token}`);
        dispatch(initialize(token))
      });
  }

  setSelectedSegment(selectedSegment) {
    this.setState({ selectedSegment });
  }

  render() {
    const { segments } = this.props;
    const { selectedSegment } = this.state;
    const isSegments = segments !== undefined;
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
          { isSegments
            && (
              <StandingsMenu
                segments={segments}
                selectedSegment={selectedSegment}
                setSelectedSegment={this.setSelectedSegment}
              />
            )}
          <Leaderboard
            segment={selectedSegment}
          />
        </main>
      </>
    );
  }
}

Standings.propTypes = {
  dispatch: PropTypes.func,
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
