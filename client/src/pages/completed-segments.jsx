import '../config';

import React, { Component } from 'react';
import {
  authenticate,
  getSegments,
  getUsers,
} from '../api/brt';
import {
  login,
  updateSegments,
  updateUserSessionData,
  updateUsers,
} from '../actions';

import Head from 'next/head';
import Header from '../components/header';
import PropTypes from 'prop-types';
import RedirectComponent from '../components/redirect';
import Routes from '../routes';
import { connect } from 'react-redux';
import { getUserId } from '../utils/localstorage-utils';

class CompletedSegments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticationError: false,
    };
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

  update() {
    const { dispatch } = this.props;
    getSegments()
      .then((data0) => {
        dispatch(updateSegments(data0));
        getUsers()
          .then((data1) => {
            dispatch(updateUsers(data1));
          });
      });
  }

  render() {
    const {
      segments,
      users,
    } = this.props;
    const {
      isAuthenticationError,
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
            <h1 className="font-extrabold text-7xl text-center">Completed Segments</h1>
          </div>
        </main>
      </>
    );
  }
}

CompletedSegments.propTypes = {
  dispatch: PropTypes.func,
  segments: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.arrayOf(PropTypes.object),
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

export default connect(mapStateToProps)(CompletedSegments);
