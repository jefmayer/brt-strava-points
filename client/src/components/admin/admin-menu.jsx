import React, { Component } from 'react';

import AdminMenuItem from './admin-menu-item';
import PropTypes from 'prop-types';

class AdminMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      menuItems,
      selectedItem,
      setSelectedItem,
    } = this.props;
    return (
      <div className="bg-neutral-800">
        <ul className="flex justify-center">
          {
            menuItems.map((item) => (
              <li key={item.id}>
                <AdminMenuItem
                  isSelected={item.id === selectedItem.id}
                  item={item}
                  setSelectedItem={setSelectedItem}
                />
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

AdminMenu.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object),
  selectedItem: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  setSelectedItem: PropTypes.func.isRequired,
};

export default AdminMenu;
