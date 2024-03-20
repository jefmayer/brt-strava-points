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
import UpdateRecordModal from '../components/admin/update-record-modal';
import UserManager from '../components/admin/user-manager';
import { connect } from 'react-redux';
import { getUserId } from '../utils/localstorage-utils';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticationError: false,
      isModal: false,
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
      modal: {
        action: '',
        data: null,
        type: '',
      },
      selectedItem: {
        id: 0,
        name: 'Riders',
      },
    };
    this.closeModal = this.closeModal.bind(this);
    this.launchUpdateModal = this.launchUpdateModal.bind(this);
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

  closeModal() {
    this.setState({ isModal: false });
  }

  setSelectedItem(selectedItem) {
    this.setState({ selectedItem });
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

  launchUpdateModal(options) {
    const {
      action,
      data,
      type,
    } = options;
    this.setState({ isModal: true });
    this.setState({ modal: {
      action,
      data,
      type,
    } });
  }

  render() {
    const {
      segments,
      users,
    } = this.props;
    const {
      isAuthenticationError,
      isModal,
      menuItems,
      modal,
      selectedItem,
    } = this.state;
    const {
      action,
      data,
      type,
    } = modal;
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
        <main className="pb-24">
          <div className="container mb-6 mt-12 mx-auto">
            <h1 className="font-extrabold text-7xl text-center">Site Admin</h1>
          </div>
          <AdminMenu
            menuItems={menuItems}
            selectedItem={selectedItem}
            setSelectedItem={this.setSelectedItem}
          />
          { isUsers
          && (
            <UserManager
              users={users}
              launchUpdateModal={this.launchUpdateModal}
            />
          )}
          { isSegments
          && (
            <SegmentManager
              segments={segments}
              launchUpdateModal={this.launchUpdateModal}
            />
          )}
          { selectedItem.id === 2
          && (
            <ScoringManager
              users={users}
            />
          )}
          { isModal
          && (
            <UpdateRecordModal
              action={action}
              closeModal={this.closeModal}
              data={data}
              type={type}
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
