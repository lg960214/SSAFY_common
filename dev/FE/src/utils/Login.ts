export const getMagnagerToken = () => {
  const managerToken = localStorage.getItem('managerToken');
  if (managerToken) {
    return JSON.parse(managerToken).token;
  } else {
    return null;
  }
};

export const getGymName = () => {
  const managerToken = localStorage.getItem('managerToken');
  if (managerToken) {
    return JSON.parse(managerToken).name;
  } else {
    return null;
  }
};
