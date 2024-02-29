import '../styles/header.module.scss';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import RedirectComponent from '../components/redirect';
import { connect } from 'react-redux';

class VerifyAuthentication extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      isAuthenticated,
      isAuthenticatedError,
    } = this.props;
    const redirectCondition = !isAuthenticated || isAuthenticatedError;
    return (
      <>
      { redirectCondition
        && (
          <RedirectComponent
            route="/"
          />
        )}
      </>
    );
  }
}
VerifyAuthentication.propTypes = {
  isAuthenticated: PropTypes.bool,
  isAuthenticatedError: PropTypes.bool,
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

export default connect(mapStateToProps)(VerifyAuthentication);
