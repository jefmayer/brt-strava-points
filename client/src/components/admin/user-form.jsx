/*
  Todos
  [x] Set focus on modal open
  [x] Add validation for name and strava id
  [ ] Add confirmation message, button for Remove User
  [ ] Add confirmation toaster to manager after modal close
  [x] Update returns for all the update functions in API code
  [x] Update returns for all the delete functions in API code
*/
import React, { Component } from 'react';
import {
  addUser,
  removeUser,
} from '../../api/brt';

import Input from './form-controls/input';
import PropTypes from 'prop-types';
import Select from './form-controls/select';
import { connect } from 'react-redux';
import { updateUsers } from '../../actions';

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
    };
    this.updateState = this.updateState.bind(this);
    this.validate = this.validate.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
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

  updateState(prop, value) {
    const { form } = this.state;
    form[prop].value = value;
    this.setState(form);
  }

  onSubmitClick() {
    const { form } = this.state;
    const {
      displayname,
      id,
      role,
    } = form;
    const {
      closeModal,
      dispatch,
    } = this.props;
    if (!this.validate()) {
      return;
    }
    this.setState({isSubmitting: true});
    addUser({
      displayname: displayname.value,
      id: parseInt(id.value, 10),
      role: role.value,
    })
      .then((data) => {
        dispatch(updateUsers(data));
        this.setState({isSubmitting: false});
        closeModal();
      });
  }

  onRemoveClick() {
    const { form } = this.state;
    const { id } = form;
    const {
      closeModal,
      dispatch,
    } = this.props;
    console.log(id);
    removeUser({
      id: parseInt(id.value, 10),
    })
      .then((data) => {
        dispatch(updateUsers(data));
        this.setState({isSubmitting: false});
        closeModal();
      });
  }

  onCancelClick() {
    const { closeModal } = this.props;
    closeModal();
  }

  render() {
    const {
      action,
    } = this.props;
    const {
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
          User
        </h2>
        <form className="py-8">
          <Input 
            id="displayname"
            isValid={displayname.isValid}
            label="Name"
            onChange={this.updateState}
            placeholder="Add Name"
            setFocus={true}
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
