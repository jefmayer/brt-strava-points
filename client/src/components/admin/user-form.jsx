import React, { Component } from 'react';

import PropTypes from 'prop-types';

class UserForm extends Component {
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
    const {
      displayname,
      id,
      role,
    } = data;
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
          <div className="flex flex-col mb-4">
            <label
              className="font-semibold mb-1 text-xs"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="border border-neutral-200 p-1.5 text-sm"
              id="name"
              name="name"
              placeholder="Add Name"
              type="text"
              value={displayname}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label
              className="font-semibold mb-1 text-xs"
              htmlFor="id"
            >
              Strava Id
            </label>
            <input
              className="border border-neutral-200 p-1.5 text-sm"
              id="id"
              name="id"
              placeholder="Add Strava Id"
              type="text"
              value={id}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label
              className="font-semibold mb-1 text-xs"
              htmlFor="role"
            >
              Role
            </label>
            <select
              className="bg-neutral-100 border border-neutral-300 px-1.5 py-2 rounded-md text-sm"
              id="role"
              name="role"
            >
              <option>User</option>
              <option>Admin</option>
            </select>
          </div>
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
          { action === 'update'
          && (
            <div className="mt-2">
              <button
                className="font-semibold text-red text-xs underline"
                onClick={null}
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
};

export default UserForm;
