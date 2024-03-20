import React, { Component } from 'react';

import PropTypes from 'prop-types';
import SegmentRecord from './segment-record';

class SegmentManager extends Component {
  constructor(props) {
    super(props);
    this.onAddClick = this.onAddClick.bind(this);
  }

  onAddClick() {
    const {
      launchUpdateModal,
      segment,
    } = this.props;
    launchUpdateModal({
      action: 'add',
      data: segment,
      type: 'segment',
    });
  }

  render() {
    const {
      launchUpdateModal,
      segments,
    } = this.props;
    return (
      <>
        <div className="pb-5 pl-4 pt-20">
          <h2 className="font-extrabold text-6xl">Segments</h2>
        </div>
        <div>
        <table className="table-auto w-full">
            <thead className="bg-neutral-300">
              <tr>
                <th className="font-semibold pl-4 pr-2 py-2 text-left text-xs">Name</th>
                <th className="font-semibold px-2 py-2 text-left text-xs">Strava Id</th>
                <th className="font-semibold px-2 py-2 text-left text-xs">Time</th>
                <th className="font-semibold px-2 py-2 text-left text-xs">Area</th>
                <th className="font-semibold pl-2 pr-4 py-2 text-left text-xs">
                  <span className="block h-0 invisible overflow-hidden w-0">Edit Record</span>
                </th>
              </tr>
            </thead>
            <tbody>
            {
              segments.map((segment) => (
                <SegmentRecord
                  launchUpdateModal={launchUpdateModal}
                  key={segment.id}
                  segment={segment}
                />
              ))
            }
            </tbody>
          </table>
          <div className="bg-white w-full">
            <button
              className="btn btn-primary m-4"
              onClick={this.onAddClick}
              type="button"
            >
              Add Segment
            </button>
          </div>
        </div>
      </>
    );
  }
};

SegmentManager.propTypes = {
  launchUpdateModal: PropTypes.func,
  segments: PropTypes.arrayOf(PropTypes.object),
};

export default SegmentManager;
