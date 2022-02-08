import _ from 'lodash';

export const parseUsername = (username: string): string => {
  if (!username.includes('.')) {
    return _.upperFirst(username);
  }

  const [firstName, lastName] = username.split('.');
  return `${_.upperFirst(firstName)} ${_.upperFirst(lastName)}`;
};
