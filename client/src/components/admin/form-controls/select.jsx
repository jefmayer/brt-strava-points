import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { getRoleOptions } from '../../../helpers/form-helpers';

class Select extends Component {
  constructor(props) {
    super(props);
    this.focusRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { id, onChange } = this.props;
    onChange(id, event.target.value);
  }

  componentDidMount() {
    const { setFocus } = this.props;
    if (setFocus) {
      this.focusRef.current.focus();
    }
  }

  render() {
    const {
      id,
      isValid,
      label,
      value,
    } = this.props;
    return (
      <div className="flex flex-col mb-4">
        <label
          className="font-semibold mb-1 text-xs"
          htmlFor={id}
        >
          {label}
        </label>
        <select
          className="bg-neutral-100 border border-neutral-300 px-1.5 py-2 rounded-md text-sm"
          id={id}
          onChange={this.handleChange}
          ref={this.focusRef}
          value={value}
        >
          {
            getRoleOptions().map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))
          }
        </select>
        { !isValid
          && (
            <div className="mt-1 text-red-500 text-xs">
              {label}
              &nbsp;Required
            </div>
          )}
      </div>
    );
  }
}

Select.propTypes = {
  id: PropTypes.string,
  isValid: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  setFocus: PropTypes.bool,
  value: PropTypes.string,
};

export default Select;
