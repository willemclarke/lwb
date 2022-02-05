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
  carerEntities: CarerEntity[];
}

export type Response = CarerEntity | ClientEntity;

export class UserService {
  data: Response[];

  constructor(data: Response[]) {
    this.data = data;
  }

  getUsernames(): string[] {
    return [...new Set(this.data.flatMap((item) => item.users_allowed_access))];
  }

  getUser(username: string): User {
    const clients = this.data.filter(isClient);
    const carers = this.data.filter(isCarer);

    return {
      user: username,
      clients: clients.filter((client) => client.users_allowed_access.includes(username)),
      carerEntities: carers.filter((carer) => carer.users_allowed_access.includes(username)),
    };
  }

  getClientsAndCarersForUsers = (
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
}

// function to retrieve the raw json data
export const fetchRawData = async (): Promise<Response[]> => {
  const resp = await axios.get<Response[]>(
    'http://lwb-test-dev-take-home-test.s3-website-ap-southeast-2.amazonaws.com/data.json'
  );
  return resp.data;
};
