import '../config';

import React, { Component } from 'react';
import {
  addAttempts,
  authenticate,
  getAttempts,
  getSegments,
  getUsers,
} from '../api/brt';
import {
  compareAttemptResults,
  getBestAttemptBySegment,
  getLatestUsers,
} from '../selectors';
import {
  login,
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
import Routes from '../routes';
import StandingsMenu from '../components/standings/standings-menu';
import { connect } from 'react-redux';
import { getDefaultSegmentObj } from '../helpers/segment-helpers';
import { getUserId } from '../utils/localstorage-utils';
import { updateAccessToken } from '../api/strava';

class Standings extends Component {
  constructor(props) {
    super(props);
    const selectedSegment = getDefaultSegmentObj();
    this.state = {
      isAuthenticationError: false,
      selectedSegment,
    };
    this.setSelectedSegment = this.setSelectedSegment.bind(this);
    this.onUpdateClick = this.onUpdateClick.bind(this);
  }

  componentDidMount() {
    const id = getUserId();
    authenticate(id)
      .then((data) => {
        if (data.success) {
          const { dispatch } = this.props;
          dispatch(updateUserSessionData(data));
          dispatch(login());
          this.update();
        } else {
          this.setState({ isAuthenticationError: true });
        }
      });
  }

  setSelectedSegment(selectedSegment) {
    this.setState({ selectedSegment });
  }

  update() {
    const { dispatch } = this.props;
    getSegments()
      .then((data0) => {
        dispatch(updateSegments(data0));
        getUsers()
          .then((data1) => {
            dispatch(updateUsers(data1));
            getAttempts()
              .then((data2) => {
                dispatch(updateAttempts(data2));
              });
          });
      });
  }

  onUpdateClick() {
    const {
      attempts,
      dispatch,
      segments,
      users,
    } = this.props;
    updateAccessToken()
      .then(() => {
        getBestAttemptBySegment(segments)
          .then((data) => {
            const bestAttempts = compareAttemptResults(data, attempts);
            dispatch(
              updateAttempts(bestAttempts),
            );
            addAttempts(bestAttempts);
          });
        getLatestUsers(users);
      });
  }

  render() {
    const {
      attempts,
      segments,
      users,
    } = this.props;
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
            route={Routes.Home}
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
            <h1 className="font-extrabold text-7xl text-center">Standings</h1>
            <button
              className="btn btn-secondary"
              onClick={this.onUpdateClick}
              type="button"
            >
              Update Standings
            </button>
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
            attempts={attempts}
            segment={selectedSegment}
            users={users}
          />
        </main>
      </>
    );
  }
}

Standings.propTypes = {
  attempts: PropTypes.arrayOf(PropTypes.object),
  dispatch: PropTypes.func,
  segments: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => {
  const {
    appData,
  } = state;
  const {
    attempts,
    segments,
    users,
  } = appData;
  return {
    attempts,
    segments,
    users,
  };
};

export default connect(mapStateToProps)(Standings);
