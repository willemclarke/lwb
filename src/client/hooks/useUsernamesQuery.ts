import axios from 'axios';
import { useQuery } from 'react-query';

const fetchUsernames = async (): Promise<string[]> => {
  const data = await axios.get('http://localhost:4000/usernames');
  return data.data;
};

export const useUsernamesQuery = () => {
  return useQuery<string[], Error, string[]>(['usernames'], () => fetchUsernames());
};
