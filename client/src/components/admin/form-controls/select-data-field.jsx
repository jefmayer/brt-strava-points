import React, { Component } from 'react';

import PropTypes from 'prop-types';

class SelectDataField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      editMode,
      options,
      value,
    } = this.props;
    return (
      <>
        { editMode
          ?
            <select>
            {
              options.map((option) => (
                <option
                    key={option.id}
                    selected={option.id === value ? 'selected' : ''}
                  >
                    {option.name}
                  </option>
              ))
            }
            </select>
          :
            <span>{value}</span>
          }
      </>
    );
  }
};

SelectDataField.propTypes = {
  editMode: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })),
  value: PropTypes.string,
};

export default SelectDataField;
