const getRegionOptions = () => (
  [
    {
      label: 'Catalina Foothills',
      value: 'CF',
    },
    {
      label: 'Oro Valley',
      value: 'OV',
    },
    {
      label: 'West Tucson',
      value: 'W',
    },
    {
      label: 'East Tucson',
      value: 'E',
    },
  ]
);

const getRoleOptions = () => (
  [
    {
      label: 'User',
      value: 'user',
    },
    {
      label: 'Admin',
      value: 'admin',
    },
  ]
);

export {
  getRegionOptions,
  getRoleOptions,
};
