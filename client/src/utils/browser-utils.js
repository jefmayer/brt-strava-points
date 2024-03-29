const isBrowser = () => (
  typeof window !== 'undefined'
);

const saveToLocalStorage = (key, data) => {
  if (typeof window === 'undefined') return null;
  const { localStorage } = window;
  localStorage.setItem(key, JSON.stringify(data));
  return true;
};

const retreiveFromLocalStorage = (key) => {
  if (typeof window === 'undefined') return null;
  const { localStorage } = window;
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error(error);
    return null;
  }
};

export {
  isBrowser,
  retreiveFromLocalStorage,
  saveToLocalStorage,
};
