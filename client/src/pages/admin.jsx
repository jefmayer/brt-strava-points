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

import AdminMenu from '../components/admin/admin-menu';
import Head from 'next/head';
import Header from '../components/header';
import PropTypes from 'prop-types';
import RedirectComponent from '../components/redirect';
import Routes from '../routes';
import ScoringManager from '../components/admin/scoring-manager';
import SegmentManager from '../components/admin/segment-manager';
import UserManager from '../components/admin/user-manager';
import { connect } from 'react-redux';
import { getUserId } from '../utils/localstorage-utils';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticationError: false,
      menuItems: [
        {
          id: 0,
          name: 'Riders',
        },
        {
          id: 1,
          name: 'Segments',
        },
        {
          id: 2,
          name: 'Scoring',
        },
      ],
      selectedItem: {
        id: 0,
        name: 'Riders',
      },
    };
    this.setSelectedItem = this.setSelectedItem.bind(this);
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

  setSelectedItem(selectedItem) {
    this.setState({ selectedItem });
  }

  render() {
    const {
      segments,
      users,
    } = this.props;
    const {
      isAuthenticationError,
      menuItems,
      selectedItem,
    } = this.state;
    const isSegments = segments !== undefined && selectedItem.id === 1;
    const isUsers = users !== undefined && selectedItem.id === 0;
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
            <h1 className="font-extrabold text-7xl text-center">Site Admin</h1>
          </div>
          < AdminMenu
            menuItems={menuItems}
            selectedItem={selectedItem}
            setSelectedItem={this.setSelectedItem}
          />
          { isUsers
          && (
            <UserManager
              users={users}
            />
          )}
          { isSegments
          && (
            <SegmentManager
              segments={segments}
            />
          )}
          { selectedItem.id === 2
          && (
            <ScoringManager
              users={users}
            />
          )}
        </main>
      </>
    );
  }
}

Admin.propTypes = {
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

export default connect(mapStateToProps)(Admin);
