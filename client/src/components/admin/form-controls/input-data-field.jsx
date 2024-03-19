import React, { Component } from 'react';

import PropTypes from 'prop-types';

class InputDataField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      editMode,
      label,
      value,
    } = this.props;
    return (
      <>
        { editMode
          ?
            <input
              placeholder={label}
              value={value}
              type="text"
            />
          :
            <span>{value}</span>
          }
      </>
    );
  }
};

InputDataField.propTypes = {
  editMode: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string,
};

export default InputDataField;
