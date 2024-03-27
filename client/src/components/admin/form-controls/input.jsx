import React, { Component } from 'react';

import PropTypes from 'prop-types';

class Input extends Component {
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
      placeholder,
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
        <input
          className="border border-neutral-200 p-1.5 text-sm"
          id={id}
          onChange={this.handleChange}
          placeholder={placeholder}
          ref={this.focusRef}
          type="text"
          value={value}
        />
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

Input.propTypes = {
  id: PropTypes.string,
  isValid: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  setFocus: PropTypes.bool,
  value: PropTypes.string,
};

export default Input;
