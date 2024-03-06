import '../config';

import React, { Component } from 'react';
import {
  authenticate,
  getSegments,
  getUsers,
} from '../api/brt';
import {
  updateAttempts,
  updateSegments,
  updateUserSessionData,
  updateUsers,
} from '../actions';

import Head from 'next/head';
import Header from '../components/header';
import Leaderboard from '../components/standings/leaderboard';
import PropTypes from 'prop-types';
import RedirectComponent from '../components/redirect';
import StandingsMenu from '../components/standings/standings-menu';
import { connect } from 'react-redux';
import { getAttempts } from '../selectors';
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
    const id = getUserId();
    authenticate(id)
      .then((data) => {
        if (data.success) {
          const { dispatch } = this.props;
          dispatch(updateUserSessionData(data));
          this.update();
        } else {
          this.setState({ isAuthenticationError: true });
        }
      });
  }

  update() {
    const { dispatch } = this.props;
    getSegments()
      .then((data) => {
        dispatch(updateSegments(data));
        getUsers()
          .then((data) => {
            dispatch(updateUsers(data));
            const { segments, users } = this.props;
            /*getAttempts(segments, users)
              .then((data) => {
                console.log(data);
                dispatch(updateAttempts(data));
              }); */
          });
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
    users,
  } = appData;
  return {
    segments,
    users,
  };
};

export default connect(mapStateToProps)(Standings);
