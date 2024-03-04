import React, { Component } from 'react';

import PropTypes from 'prop-types';
import StandingsMenuItem from './standings-menu-item';
import { getDefaultSegmentObj } from '../../helpers/segment-helpers';
import styles from '../../styles/standings-menu.module.scss';

class StandingsMenu extends Component {
  constructor(props) {
    super(props);
    this.onMenuClick = this.onMenuClick.bind(this);
  }

  onMenuClick() {
    console.log(this);
    console.log('open/close standings menu')
  }

  render() {
    const {
      segments,
      selectedSegment,
      setSelectedSegment,
    } = this.props;
    const defaultSegment = getDefaultSegmentObj();
    return (
      <>
        <button
          className={`${styles.btn} bg-neutral-800 block w-full`}
          onClick={this.onMenuClick}
          type="button"
        >
          <span className="block color-brt-white font-semibold mx-auto py-3 text-2xl text-center text-neutral-200">
            {selectedSegment.name}
          </span>
        </button>
        <ul className="bg-neutral-700">
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
    name: PropTypes.string,
  }),
  setSelectedSegment: PropTypes.func.isRequired,
};

export default StandingsMenu;
