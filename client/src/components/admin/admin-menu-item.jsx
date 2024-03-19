import React, { Component } from 'react';

import PropTypes from 'prop-types';

class AdminMenuItem extends Component {
  constructor(props) {
    super(props);
    this.onMenuClick = this.onMenuClick.bind(this);
  }

  onMenuClick() {
    const {
      item,
      setSelectedItem,
    } = this.props;
    setSelectedItem(item);
  }

  render() {
    const {
      isSelected,
      item,
    } = this.props;
    return (
      <button
        className={`${isSelected ? 'no-underline text-neutral-400' : 'underline text-neutral-200'} hover:no-underline px-4 py-3 text-sm`}
        onClick={this.onMenuClick}
        type="button"
      >
        {item.name}
      </button>
    );
  }
}

AdminMenuItem.propTypes = {
  isSelected: PropTypes.bool,
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  setSelectedItem: PropTypes.func,
};

export default AdminMenuItem;
