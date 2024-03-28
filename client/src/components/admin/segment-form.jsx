import React, { Component } from 'react';
import {
  addSegment,
  removeSegment,
} from '../../api/brt';
import {
  adminUpdate,
  updateSegments,
} from '../../actions';

import Input from './form-controls/input';
import PropTypes from 'prop-types';
import Select from './form-controls/select';
import { connect } from 'react-redux';
import { getRegionOptions } from '../../helpers/form-helpers';

class SegmentForm extends Component {
  constructor(props) {
    super(props);
    const { data } = props;
    const {
      displayname,
      estimated_time,
      id,
      region_code,
    } = data;
    this.state = {
      form: {
        displayname: {
          ...(displayname ? { value: displayname } : { value: '' }),
          isValid: true,
        },
        estimated_time: {
          ...(estimated_time ? { value: estimated_time } : { value: '' }),
          isValid: true,
        },
        id: {
          ...(id ? { value: id } : { value: '' }),
          isValid: true,
        },
        region_code: {
          ...(region_code ? { value: region_code } : { value: 'CF' }),
          isValid: true,
        },
      },
      isSubmitting: false,
      displayRemoveConfirmation: false,
    };
    this.updateState = this.updateState.bind(this);
    this.validate = this.validate.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onRemoveCancelClick = this.onRemoveCancelClick.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.onRemoveConfirmationClick = this.onRemoveConfirmationClick.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  onSubmitClick() {
    const { form } = this.state;
    const {
      displayname,
      estimated_time,
      id,
      region_code,
    } = form;
    const {
      closeModal,
      dispatch,
    } = this.props;
    if (!this.validate()) {
      return;
    }
    this.setState({ isSubmitting: true });
    // Get additional segment data
    // then
    addSegment({
      displayname: displayname.value,
      estimated_time: estimated_time.value,
      id: parseInt(id.value, 10),
      region_code: region_code.value,
    })
      .then((data) => {
        dispatch(updateSegments(data));
        dispatch(adminUpdate());
        this.setState({ isSubmitting: false });
        closeModal();
      });
  }

  onRemoveConfirmationClick() {
    const { form } = this.state;
    const { id } = form;
    const {
      closeModal,
      dispatch,
    } = this.props;
    removeSegment({
      id: parseInt(id.value, 10),
    })
      .then((data) => {
        dispatch(updateUsers(data));
        dispatch(adminUpdate());
        this.setState({ isSubmitting: false });
        closeModal();
      });
  }

  onRemoveCancelClick() {
    this.setState({ displayRemoveConfirmation: false });
  }

  onRemoveClick() {
    this.setState({ displayRemoveConfirmation: true });
  }

  onCancelClick() {
    const { closeModal } = this.props;
    closeModal();
  }

  updateState(prop, value) {
    const { form } = this.state;
    form[prop].value = value;
    this.setState(form);
  }

  validate() {
    const { form } = this.state;
    const {
      displayname,
      estimated_time,
      id,
      region_code,
    } = form;
    let isValid = true;
    const arr = [region_code, displayname, id, estimated_time];
    arr.forEach((field) => {
      field.isValid = field.value !== '';
      this.setState(field);
      if (field.value === '') {
        isValid = false;
      }
    });
    return isValid;
  }

  render() {
    const {
      action,
    } = this.props;
    const {
      displayRemoveConfirmation,
      form,
      isSubmitting,
    } = this.state;
    const {
      estimated_time,
      displayname,
      id,
      region_code,
    } = form;
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
        <form className="py-8 relative">
          <div className={`absolute bg-white h-full opacity-75 top-0 w-full z-10 ${displayRemoveConfirmation ? '' : 'hidden'}`} />
          <Input
            id="displayname"
            isValid={displayname.isValid}
            label="Name"
            onChange={this.updateState}
            placeholder="Add Name"
            setFocus
            value={displayname.value}
          />
          <Input
            id="id"
            isValid={id.isValid}
            label="Strava Id"
            onChange={this.updateState}
            placeholder="Add Strava Id"
            value={id.value.toString()}
          />
          <Input
            id="estimated_time"
            isValid={estimated_time.isValid}
            label="Completion Time"
            onChange={this.updateState}
            placeholder="Add Time in Seconds"
            value={estimated_time.value.toString()}
          />
          <Select
            id="region_code"
            isValid={region_code.isValid}
            label="Area"
            onChange={this.updateState}
            options={getRegionOptions()}
            value={region_code.value}
          />
          <div className="flex">
            <button
              className={`btn btn-primary mr-2 ${isSubmitting ? 'disabled' : ''}`}
              onClick={this.onSubmitClick}
              type="button"
            >
              {action === 'add' ? 'Add' : 'Update'}
            </button>
            <button
              className="btn btn-secondary"
              onClick={this.onCancelClick}
              type="button"
            >
              Cancel
            </button>
          </div>
          { action === 'update'
          && (
            <div className="mt-2">
              <button
                className="font-semibold text-red-500 text-xs underline"
                onClick={this.onRemoveClick}
                type="button"
              >
                Remove Segment
              </button>
            </div>
          )}
        </form>
        { displayRemoveConfirmation
        && (
          <div className="bg-neutral-100 flex items-center justify-end p-4">
            <div className="mr-2 text-neutral-600 text-sm">Are you sure you want to delete?</div>
            <button
              className={`btn btn-sm btn-primary mr-2 w-12 ${isSubmitting ? 'disabled' : ''}`}
              onClick={this.onRemoveConfirmationClick}
              type="button"
            >
              Yes
            </button>
            <button
              className="btn btn-sm btn-secondary w-12"
              onClick={this.onRemoveCancelClick}
              type="button"
            >
              No
            </button>
          </div>
        )}
      </>
    );
  }
}

SegmentForm.propTypes = {
  action: PropTypes.string,
  closeModal: PropTypes.func,
  data: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(
  null,
  null,
)(SegmentForm);
