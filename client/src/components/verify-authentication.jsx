import '../styles/header.module.scss';

import PropTypes from 'prop-types';
import React from 'react';
import RedirectComponent from './redirect';
import { connect } from 'react-redux';

function VerifyAuthentication({
  isAuthenticated,
  isAuthenticatedError,
}) {
  const redirectCondition = !isAuthenticated || isAuthenticatedError;
  return (
    <div>
      { redirectCondition
        && (
          <RedirectComponent
            route="/"
          />
        )}
    </div>
  );
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
