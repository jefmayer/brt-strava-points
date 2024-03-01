import React, { Component } from 'react';

import Image from 'next/image';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../styles/header.module.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.onMenuClick = this.onMenuClick.bind(this);
  }

  onMenuClick(event) {
    console.log(event);
    console.log(this);
  }

  render() {
    const {
      athlete,
      role,
    } = this.props;
    console.log(`role: ${role}`);
    if (athlete === undefined) {
      return;
    }
    const { profile_medium } = athlete;
    return (
      <header className="bg-brt-red h-16">
        <div className="flex h-full items-center justify-between mx-auto px-4">
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
                src={profile_medium}
                width={48}
              />
            </span>
            <span className={styles.indicator}>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  athlete: PropTypes.shape({
    profile_medium: PropTypes.string,
  }).isRequired,
  role: PropTypes.string,
};

const mapStateToProps = (state) => {
  const {
    userSessionData,
    userStatus,
  } = state;
  const {
    athlete,
  } = userSessionData;
  const {
    role,
  } = userStatus;
  return {
    athlete,
    role,
  };
};

export default connect(mapStateToProps)(Header);
