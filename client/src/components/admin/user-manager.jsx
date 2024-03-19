import React, { Component } from 'react';

import PropTypes from 'prop-types';
import UserRecord from './user-record';

class UserManager extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { users } = this.props;
    return (
      <>
        <div className="pb-5 pl-4 pt-20">
          <h2 className="font-extrabold text-6xl">Riders</h2>
        </div>
        <div>
          <table className="table-auto w-full">
            <thead className="bg-neutral-300">
              <tr>
                <th className="font-semibold px-4 py-2 text-left text-xs">Display Name</th>
                <th className="font-semibold px-4 py-2 text-left text-xs">Strava Id</th>
                <th className="font-semibold px-4 py-2 text-left text-xs">Role</th>
                <th className="font-semibold px-4 py-2 text-left text-xs">
                  <span className="invisible">Role</span>
                </th>
              </tr>
            </thead>
            <tbody>
            {
              users.map((user) => (
                <UserRecord
                  key={user.id}
                  user={user}
                />
              ))
            }
            </tbody>
          </table>
        </div>
      </>
    );
  }
};

UserManager.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
};

export default UserManager;
