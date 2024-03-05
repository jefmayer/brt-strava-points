import '../config';

import React, { Component } from 'react';
import { loadStandingsData, persistUserSessionData } from '../actions';

import Head from 'next/head';
import Header from '../components/header';
import Leaderboard from '../components/standings/leaderboard';
import PropTypes from 'prop-types';
import RedirectComponent from '../components/redirect';
import StandingsMenu from '../components/standings/standings-menu';
import { authenticate } from '../api/brt';
import { connect } from 'react-redux';
import { getDefaultSegmentObj } from '../helpers/segment-helpers';
import { getUserId } from '../utils/strava-oauth-utils';

class Standings extends Component {
  constructor(props) {
    super(props);
    const selectedSegment = getDefaultSegmentObj();
    this.state = {
      isAuthenticationError: false,
      selectedSegment,
    };
    this.setSelectedSegment = this.setSelectedSegment.bind(this);    
  }

  componentDidMount() {
    /*
      1. Authenticate using id in local storage
        a. authenticate() returns logged-in user's athlete data
        b. If authentication is invalid, redirect to error page
        c. If valid, continue
      2. Get segments from DB
      3. Get all users' data from DB (not just logged-in user data)
        a. Logged-in user's athlete data should have been saved to DB upon authentication
      4. Get all users' segment data from DB (not just logged-in user data)
        a. Logged-in user's segment data should have been saved to DB upon authentication
    */
    const id = getUserId();
    if (id === '') {
      this.setState({ isAuthenticationError: true });
    }
    authenticate(id)
      .then((data) => {
        if (data.success) {
          const { dispatch } = this.props;
          console.log(data);
          dispatch(persistUserSessionData(data));
          dispatch(loadStandingsData());
        } else {
          this.setState({ isAuthenticationError: true });
        }
      });
  }

  setSelectedSegment(selectedSegment) {
    this.setState({ selectedSegment });
  }

  render() {
    const { segments } = this.props;
    const { 
      isAuthenticationError,
      selectedSegment,
    } = this.state;
    const isSegments = segments !== undefined;
    return (
      <>
        { isAuthenticationError
        && (
          <RedirectComponent
            route="/"
          />
        )}
        <Head>
          <title>{ global.config.i18n.siteTitle.en }</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main>
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
