import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { getRoleOptions } from '../../helpers/form-helpers';

class UserRecord extends Component {
  constructor(props) {
    super(props);
    this.onEditClick = this.onEditClick.bind(this);
    this.roleOptions = getRoleOptions();
  }

  onEditClick() {
    const {
      launchUpdateModal,
      user,
    } = this.props;
    launchUpdateModal({
      action: 'update',
      data: user,
      type: 'user',
    });
  }

  getRoleLabelByValue(value) {
    const item = this.roleOptions
      .find((role) => role.value === value);
    if (item) {
      return item.label;
    }
    return '';
  }

  render() {
    const { user } = this.props;
    const {
      displayname,
      id,
      role,
    } = user;
    return (
      <tr className="border-b border-b-neutral-200 bg-white hover:bg-lightblue-200 transition-colors">
        <td className="align-top pl-4 pr-2 py-3 text-sm">{displayname}</td>
        <td className="align-top px-2 py-3 text-sm">{id}</td>
        <td className="align-top px-2 py-3 text-sm">{this.getRoleLabelByValue(role)}</td>
        <td className="align-middle pl-2 pr-4 py-3 text-right text-xs">
          <button
            className="font-semibold text-red-500 underline"
            onClick={this.onEditClick}
            type="button"
          >
            Edit
          </button>
        </td>
      </tr>
    );
  }
}

UserRecord.propTypes = {
  launchUpdateModal: PropTypes.func,
  user: PropTypes.shape({
    displayname: PropTypes.string,
    id: PropTypes.number,
    role: PropTypes.string,
  }),
};

export default UserRecord;
