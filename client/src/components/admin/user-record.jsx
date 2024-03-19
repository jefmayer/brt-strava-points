import React, { Component } from 'react';

import InputDataField from './form-controls/input-data-field';
import PropTypes from 'prop-types';
import SelectDataField from './form-controls/select-data-field';

class UserRecord extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;
    const {
      displayName,
      id,
      role,
    } = user;
    const roleOptions = [
      {
        id: 'admin',
        name: 'Admin',
      },
      {
        id: 'user',
        name: 'User',
      },
    ];
    return (
      <tr>
        <td>
          <InputDataField
            editMode={false}
            label="Enter Name"
            value={displayName}
          />
        </td>
        <td>
          <InputDataField
            editMode={false}
            label="Enter Id"
            value={id}
          />
        </td>
        <td>
          <SelectDataField
            editMode={false}
            options={roleOptions}
            value={role}
          />
        </td>
        <td></td>
      </tr>
    );
  }
};

UserRecord.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    id: PropTypes.number,
    role: PropTypes.string,
  }),
};

export default UserRecord;
