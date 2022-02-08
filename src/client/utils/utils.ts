import _ from 'lodash';

export const parseUsername = (user: string): string => {
  const [firstName, lastName] = user.split('.');
  return `${_.upperFirst(firstName)} ${_.upperFirst(lastName)}`;
};
