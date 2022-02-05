import axios from 'axios';
import { useQuery } from 'react-query';
import { User } from '../../server/userSservice';

const fetchUser = async (username: string): Promise<User> => {
  const data = await axios.get(`http://localhost:4000/user/${username}`);
  return data.data;
};

export const useUserQuery = (username: string) => {
  return useQuery<User, Error, User>(['user', username], () => fetchUser(username));
};
