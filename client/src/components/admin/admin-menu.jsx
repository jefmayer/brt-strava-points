import AdminMenuItem from './admin-menu-item';
import PropTypes from 'prop-types';
import React from 'react';

export default function AdminMenu({
  menuItems,
  selectedItem,
  setSelectedItem,
}) {
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

AdminMenu.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object),
  selectedItem: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  setSelectedItem: PropTypes.func.isRequired,
};
