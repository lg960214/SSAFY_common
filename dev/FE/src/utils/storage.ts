type SettingKey = 'managerToken' | 'userToken';

export const getToken = (name: SettingKey) => {
  const managerToken = localStorage.getItem(name);
  if (managerToken) {
    return JSON.parse(managerToken).token;
  } else {
    return null;
  }
};

export const getName = (name: SettingKey) => {
  const managerToken = localStorage.getItem(name);
  if (managerToken) {
    return JSON.parse(managerToken).name;
  } else {
    return null;
  }
};
