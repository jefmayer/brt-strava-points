import React, { Component } from 'react';

import PropTypes from 'prop-types';
import StandingsMenuItem from './standings-menu-item';
import { getDefaultSegmentObj } from '../../helpers/segment-helpers';
import styles from '../../styles/standings-menu.module.scss';

class StandingsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
    this.onMenuClick = this.onMenuClick.bind(this);
  }

  onMenuClick() {
    const { isMenuOpen } = this.state;
    this.setState({ isMenuOpen: !isMenuOpen });
  }

  render() {
    const {
      segments,
      selectedSegment,
      setSelectedSegment,
    } = this.props;
    const { isMenuOpen } = this.state;
    const defaultSegment = getDefaultSegmentObj();
    return (
      <>
        <button
          className={`${styles.btn} bg-neutral-800 block w-full`}
          onClick={this.onMenuClick}
          type="button"
        >
          <span className="block font-semibold mx-auto py-3 text-2xl text-center text-neutral-200">
            {selectedSegment.displayname}
          </span>
        </button>
        <ul className={`${isMenuOpen ? '' : 'hidden'} bg-neutral-700`}>
          <li>
            <StandingsMenuItem
              isSelected={defaultSegment.id === selectedSegment.id}
              segment={defaultSegment}
              setSelectedSegment={setSelectedSegment}
            />
          </li>
          {
            segments.map((segment) => (
              <li key={segment.id}>
                <StandingsMenuItem
                  isSelected={segment.id === selectedSegment.id}
                  segment={segment}
                  setSelectedSegment={setSelectedSegment}
                />
              </li>
            ))
          }
        </ul>
      </>
    );
  }
}

StandingsMenu.propTypes = {
  segments: PropTypes.arrayOf(PropTypes.object),
  selectedSegment: PropTypes.shape({
    id: PropTypes.number,
    displayname: PropTypes.string,
  }),
  setSelectedSegment: PropTypes.func.isRequired,
};

export default StandingsMenu;
