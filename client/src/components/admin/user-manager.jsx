import React, { Component } from 'react';

import PropTypes from 'prop-types';
import UserRecord from './user-record';

class UserManager extends Component {
  constructor(props) {
    super(props);
    this.onAddClick = this.onAddClick.bind(this);
  }

  onAddClick() {
    const {
      launchUpdateModal,
      user,
    } = this.props;
    launchUpdateModal({
      action: 'add',
      data: user,
      type: 'user',
    });
  }

  render() {
    const {
      launchUpdateModal,
      users,
    } = this.props;
    return (
      <>
        <div className="pb-5 pl-4 pt-20">
          <h2 className="font-extrabold text-6xl">Riders</h2>
        </div>
        <div>
          <table className="table-auto w-full">
            <thead className="bg-neutral-300">
              <tr>
                <th className="font-semibold pl-4 pr-2 py-2 text-left text-xs">Display Name</th>
                <th className="font-semibold px-2 py-2 text-left text-xs">Strava Id</th>
                <th className="font-semibold px-2 py-2 text-left text-xs">Role</th>
                <th className="font-semibold pl-2 pr-4 py-2 text-left text-xs">
                  <span className="block h-0 invisible overflow-hidden w-0">Edit Record</span>
                </th>
              </tr>
            </thead>
            <tbody>
            {
              users.map((user) => (
                <UserRecord
                  launchUpdateModal={launchUpdateModal}
                  key={user.id}
                  user={user}
                />
              ))
            }
            </tbody>
          </table>
          <div className="bg-white w-full">
            <button
              className="btn btn-primary m-4"
              onClick={this.onAddClick}
              type="button"
            >
              Add Segment
            </button>
          </div>
        </div>
      </>
    );
  }
};

UserManager.propTypes = {
  launchUpdateModal: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.object),
};

export default UserManager;
