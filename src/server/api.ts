import axios from 'axios';
import { isCarer, isClient } from './utils';

export interface CarerEntity {
  id: string;
  type: 'carerEntity';
  ccdms_id: string;
  region: string;
  carers: Carer[];
  users_allowed_access: string[];
}

interface Carer {
  first_name: string;
  last_name: string;
  gender: string;
  address: string;
  state: string;
}

export interface ClientEntity {
  id: string;
  type: 'client';
  ccdms_id: string;
  region: string;
  first_name: string;
  last_name: string;
  gender: string;
  address: string;
  state: string;
  users_allowed_access: string[];
}

export interface User {
  user: string;
  clients: ClientEntity[];
  carers: CarerEntity[];
}

export type Response = CarerEntity | ClientEntity;

export const fetchRawData = async (): Promise<Response[]> => {
  const resp = await axios.get<Response[]>(
    'http://lwb-test-dev-take-home-test.s3-website-ap-southeast-2.amazonaws.com/data.json'
  );
  return resp.data;
};

export const getUsers = async (): Promise<User[]> => {
  const rawData = await fetchRawData();

  // use Set to remove the thousands of duplicate users
  const users = [...new Set(rawData.flatMap((item) => item.users_allowed_access))];
  const clients = rawData.filter(isClient);
  const carers = rawData.filter(isCarer);

  return getClientsAndCarersForUsers(users, clients, carers);
};

const getClientsAndCarersForUsers = (
  users: string[],
  clients: ClientEntity[],
  carers: CarerEntity[]
): User[] => {
  return users.reduce<User[]>((acc, user) => {
    return {
      ...acc,
      user,
      clients: clients.filter((client) => client.users_allowed_access.includes(user)),
      carers: carers
        .filter((carer) => carer.users_allowed_access.includes(user))
        .map((item) => item.carers),
    };
  }, []);
};
