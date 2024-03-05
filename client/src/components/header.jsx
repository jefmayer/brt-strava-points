import React, { Component } from 'react';

import Image from 'next/image';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../styles/header.module.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onMenuClick = this.onMenuClick.bind(this);
    this.onUpdateClick = this.onUpdateClick.bind(this);
  }

  onLogoutClick() {
    console.log(this);
    // Wipe local storage
  }

  onMenuClick(event) {
    console.log(event);
    console.log(this);
  }

  onUpdateClick() {
    console.log(this);
    // Check access token status
    // Authenticate
    // Persist Response
  }

  render() {
    const {
      profile,
      role,
    } = this.props;
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
          <div className="absolute bg-brt-red top-16 right-0 w-64">
            <ul className="flex flex-col">
              <li>
                <button
                  className="font-semibold px-4 py-2 text-white"
                  onClick={this.onUpdateClick}
                  type="button"
                >
                  Update
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
};

const mapStateToProps = (state) => {
  const { userSessionData } = state;
  const {
    profile,
    role,
  } = userSessionData;
  return {
    profile,
    role,
  };
};

export default connect(mapStateToProps)(Header);
