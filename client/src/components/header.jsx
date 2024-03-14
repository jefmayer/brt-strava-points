import React, { Component } from 'react';
import { compareAttemptResults, getBestAttemptBySegment, getLatestUsers } from '../selectors';
import { logout, updateAttempts } from '../actions';

import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { addAttempts } from '../api/brt';
import { connect } from 'react-redux';
import styles from '../styles/header.module.scss';
import { updateAccessToken } from '../api/strava';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onMenuClick = this.onMenuClick.bind(this);
    this.onUpdateClick = this.onUpdateClick.bind(this);
  }

  onLogoutClick() {
    const { dispatch } = this.props;
    dispatch(logout());
  }

  onMenuClick() {
    const { isMenuOpen } = this.state;
    this.setState({ isMenuOpen: !isMenuOpen });
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
      loggedIn,
      profile,
      role,
    } = this.props;
    const { isMenuOpen } = this.state;
    return (
      <header className="bg-brt-red bg-gradient-to-r from-brt-red to-strava-orange h-16">
        <div className="flex h-full items-center justify-between mx-auto px-4 relative">
          <a href="/" className="block">
            <Image
              alt=""
              className="-mt-2"
              height={40}
              src="/images/brt-logo-white.svg"
              width={107}
            />
          </a>
          { !loggedIn
          && (
            <Link
              className="font-semibold text-sm text-white underline"
              href={process.env.NEXT_PUBLIC_STRAVA_AUTHORIZATION_URL}
            >
              Rider Login
            </Link>
          )}
          { loggedIn
          && (
            <button
              className={styles.btn}
              label="User Menu"
              onClick={this.onMenuClick}
              type="button"
            >
              <span className={styles.photo}>
                <Image
                  alt=""
                  height={48}
                  src={profile}
                  width={48}
                />
              </span>
              <span className={styles.indicator}>
                <span />
                <span />
                <span />
              </span>
            </button>
          )}
          <div className={`${isMenuOpen ? '' : 'hidden'} absolute bg-brt-red top-16 right-0 w-64`}>
            <ul className="flex flex-col">
              <li>
                <button
                  className="font-semibold px-4 py-2 text-white"
                  onClick={this.onUpdateClick}
                  type="button"
                >
                  Update Standings
                </button>
              </li>
              <li>
                <button
                  className="font-semibold px-4 py-2 text-white"
                  onClick={null}
                  type="button"
                >
                  Bingo Card
                </button>
              </li>
              <li>
                <button
                  className="font-semibold px-4 py-2 text-white"
                  onClick={this.onLogoutClick}
                  type="button"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  attempts: PropTypes.arrayOf(PropTypes.object),
  dispatch: PropTypes.func,
  loggedIn: PropTypes.bool,
  profile: PropTypes.string,
  role: PropTypes.string,
  segments: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => {
  const {
    appData,
    userSessionData,
    userStatus,
  } = state;
  const {
    attempts,
    segments,
    users,
  } = appData;
  const {
    profile,
    role,
  } = userSessionData;
  const { loggedIn } = userStatus;
  return {
    attempts,
    loggedIn,
    profile,
    role,
    segments,
    users,
  };
};

export default connect(mapStateToProps)(Header);
