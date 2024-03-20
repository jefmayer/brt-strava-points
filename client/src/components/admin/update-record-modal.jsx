import React, { Component } from 'react';

import PropTypes from 'prop-types';
import SegmentForm from './segment-form';
import UserForm from './user-form';

class UpdateRecordModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      action,
      closeModal,
      data,
      type,
    } = this.props;
    return (
      <div className="fixed flex h-screen items-center justify-center left-0 top-0 w-screen">
        <div className="bg-black/75 fixed h-full left-0 top-0 w-full" />
        <div className="bg-white drop-shadow-md max-w-md mx-4 p-4 relative w-full z-10">
          { type === 'user'
          && (
            <UserForm
              action={action}
              closeModal={closeModal}
              data={data}
            />
          )}
          { type === 'segment'
          && (
            <SegmentForm
              action={action}
              closeModal={closeModal}
              data={data}
            />
          )}
        </div>
      </div>
    );
  }
}

UpdateRecordModal.propTypes = {
  action: PropTypes.string,
  data: PropTypes.object,
  closeModal: PropTypes.func,
  type: PropTypes.string,
};

export default UpdateRecordModal;
