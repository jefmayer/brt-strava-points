import React, { Component } from 'react';

import PropTypes from 'prop-types';

class StandingsMenuItem extends Component {
  constructor(props) {
    super(props);
    this.onMenuClick = this.onMenuClick.bind(this);
  }

  onMenuClick() {
    const {
      segment,
      setSelectedSegment,
    } = this.props;
    setSelectedSegment(segment);
  }

  render() {
    const { 
      isSelected,
      segment,
    } = this.props;
    return (
      <button
        className={`${isSelected ? 'bg-neutral-900' : ''} w-full`}
        onClick={this.onMenuClick}
        type="button"
      >
        <span className="block font-semibold max-w-sm mx-auto py-1.5 text-left text-md text-neutral-200">
          {segment.name}
        </span>
      </button>
    );
  }
}

StandingsMenuItem.propTypes = {
  isSelected: PropTypes.bool,
  segment: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  setSelectedSegment: PropTypes.func,
};

export default StandingsMenuItem;
