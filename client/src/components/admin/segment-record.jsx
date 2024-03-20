import React, { Component } from 'react';

import PropTypes from 'prop-types';

class SegmentRecord extends Component {
  constructor(props) {
    super(props);
    this.onEditClick = this.onEditClick.bind(this);
  }

  onEditClick() {
    const {
      launchUpdateModal,
      segment,
    } = this.props;
    launchUpdateModal({
      action: 'update',
      data: segment,
      type: 'segment',
    });
  }

  render() {
    const { segment } = this.props;
    const {
      displayname,
      estimated_time,
      id,
      region_code,
    } = segment;
    return (
      <tr className="border-b border-b-neutral-200 bg-white group hover:bg-lightblue-200 transition-colors">
        <td className="align-top pl-4 pr-2 py-3 text-sm">{displayname}</td>
        <td className="align-top px-2 py-3 text-sm">{id}</td>
        <td className="align-top px-2 py-3 text-sm">
          {estimated_time}
          s
        </td>
        <td className="align-top px-2 py-3 text-sm">{region_code}</td>
        <td className="align-middle pl-2 pr-4 py-3 text-right text-xs">
          <button
            className="font-semibold text-red underline"
            onClick={this.onEditClick}
            type="button"
          >
            Edit
          </button>
        </td>
      </tr>
    );
  }
}

SegmentRecord.propTypes = {
  launchUpdateModal: PropTypes.func,
  segment: PropTypes.shape({
    displayname: PropTypes.string,
    estimated_time: PropTypes.number,
    id: PropTypes.number,
    region_code: PropTypes.string,
  }),
};

export default SegmentRecord;
