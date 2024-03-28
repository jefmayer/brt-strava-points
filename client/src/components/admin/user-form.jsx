/*
  Todos
  [ ] Add default strava profile photo
  [ ] Add confirmation toaster to manager after modal close
*/
import React, { Component } from 'react';
import {
  addUser,
  removeUser,
} from '../../api/brt';
import {
  adminUpdate,
  updateUsers,
} from '../../actions';

import Input from './form-controls/input';
import PropTypes from 'prop-types';
import Select from './form-controls/select';
import { connect } from 'react-redux';
import { getRoleOptions } from '../../helpers/form-helpers';

class UserForm extends Component {
  constructor(props) {
    super(props);
    const { data } = props;
    const {
      displayname,
      id,
      role,
    } = data;
    this.state = {
      form: {
        displayname: {
          ...(displayname ? { value: displayname } : { value: '' }),
          isValid: true,
        },
        id: {
          ...(id ? { value: id } : { value: '' }),
          isValid: true,
        },
        role: {
          ...(role ? { value: role } : { value: 'user' }),
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
      id,
      role,
    } = form;
    const {
      action,
      closeModal,
      dispatch,
    } = this.props;
    if (!this.validate()) {
      return;
    }
    this.setState({ isSubmitting: true });
    addUser({
      displayname: displayname.value,
      id: parseInt(id.value, 10),
      ...(action === 'add' && { profile: process.env.NEXT_PUBLIC_STRAVA_DEFAULT_PROFILE }),
      role: role.value,
    })
      .then((data) => {
        dispatch(updateUsers(data));
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
    removeUser({
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
      id,
      role,
    } = form;
    let isValid = true;
    const arr = [displayname, id, role];
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
      displayname,
      id,
      role,
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
          Rider
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
          <Select
            id="role"
            isValid={role.isValid}
            label="Role"
            onChange={this.updateState}
            options={getRoleOptions()}
            value={role.value}
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
                Remove Rider
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

UserForm.propTypes = {
  action: PropTypes.string,
  closeModal: PropTypes.func,
  data: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(
  null,
  null,
)(UserForm);
