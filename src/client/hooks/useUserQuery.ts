import axios from 'axios';
import { useQuery } from 'react-query';
import { User } from '../../server/Database';

const fetchUser = async (username: string): Promise<User> => {
  try {
    const { data } = await axios.get(`http://localhost:4000/user/${username}`);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch, ${error}`);
  }
};

export const useUserQuery = (username: string) => {
  return useQuery<User, Error, User>(['user', username], () => fetchUser(username));
};
