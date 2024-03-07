import React, { Component } from 'react';
import { compareAttemptResults, getBestAttemptBySegment } from '@/selectors';

import Image from 'next/image';
import PropTypes from 'prop-types';
import { addAttempts } from '@/api/brt';
import { connect } from 'react-redux';
import styles from '../styles/header.module.scss';
import { updateAttempts } from '../actions';

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
    // Wipe local storage
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
    } = this.props;
    getBestAttemptBySegment(segments)
      .then((data) => {
        const bestAttempts = compareAttemptResults(data, attempts);
        dispatch(
          updateAttempts(bestAttempts)
        );
        addAttempts(bestAttempts);
      });
  }

  render() {
    const {
      profile,
      role,
    } = this.props;
    const { isMenuOpen } = this.state;
    if (profile === undefined) {
      return;
    }
    console.log(`role: ${role}`);
    return (
      <header className="bg-brt-red h-16">
        <div className="flex h-full items-center justify-between mx-auto px-4 relative">
          <div>
            <Image
              alt=""
              height={40}
              src="/images/brt-logo-white.svg"
              width={117}
            />
          </div>
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
  profile: PropTypes.string,
  role: PropTypes.string,
  segments: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => {
  const {
    appData,
    userSessionData,
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
  return {
    attempts,
    profile,
    role,
    segments,
    users,
  };
};

export default connect(mapStateToProps)(Header);
