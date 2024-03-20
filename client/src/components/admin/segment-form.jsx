import React, { Component } from 'react';

import PropTypes from 'prop-types';

class SegmentForm extends Component {
  constructor(props) {
    super(props);
    this.onCancelClick = this.onCancelClick.bind(this);
  }

  onCancelClick() {
    const { closeModal } = this.props;
    closeModal();
  }

  render() {
    const {
      action,
      data,
    } = this.props;
    console.log(data);
    return (
      <>
        <h2 className="font-extrabold text-4xl">
          { action === 'add'
          && (
            <span>Add </span>
          )}
          { action === 'update'
          && (
            <span>Update </span>
          )}
          Segment
        </h2>
        <form>
          <div className="flex">
            <button
              className="btn btn-primary mr-2"
              type="button"
            >
              Submit
            </button>
            <button
              className="btn btn-secondary"
              onClick={this.onCancelClick}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </>
    );
  }
};

SegmentForm.propTypes = {
  action: PropTypes.string,
  closeModal: PropTypes.func,
  data: PropTypes.object,
};

export default SegmentForm;
