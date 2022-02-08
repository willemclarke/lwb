import axios from 'axios';
import { useQuery } from 'react-query';
import { User } from '../../server/Database';

const fetchUser = async (username: string): Promise<User> => {
  const { data } = await axios.get(`http://localhost:4000/user/${username}`);
  return data;
};

export const getUserQueryKey = (username: string) => ['user', username];

export const useUserQuery = (username: string) => {
  return useQuery<User, Error, User>(getUserQueryKey(username), () => fetchUser(username));
};
