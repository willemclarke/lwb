import axios from 'axios';
import fs from 'fs';

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

export type ClientCarerData = (CarerEntity | ClientEntity)[];

export interface User {
  clientEntities: ClientEntity[];
  carerEntities: CarerEntity[];
  favourites: string[];
}

// Record whereby string (username) key, value User
export type Database = Record<string, User>;

export class DatabaseService {
  static async create(): Promise<DatabaseService> {
    const { data } = await axios.get<ClientCarerData>(
      'http://lwb-test-dev-take-home-test.s3-website-ap-southeast-2.amazonaws.com/data.json'
    );
    const usernames = [...new Set(data.flatMap((item) => item.users_allowed_access))];

    const initialData = usernames.reduce<Database>((acc, username) => {
      const clientEntities = data
        .filter((resp) => resp.type === 'client' && resp.users_allowed_access.includes(username))
        .slice(0, 50) as ClientEntity[];
      const carerEntities = data
        .filter(
          (resp) => resp.type === 'carerEntity' && resp.users_allowed_access.includes(username)
        )
        .slice(0, 50) as CarerEntity[];

      return {
        ...acc,
        [username]: {
          clientEntities,
          carerEntities,
          favourites: [],
        },
      };
    }, {});

    // Seed initial data in database
    await fs.promises.writeFile('./database.json', JSON.stringify(initialData));
    return new DatabaseService();
  }

  async getData(): Promise<Database> {
    const data = await fs.promises.readFile('./database.json', 'utf8');
    return JSON.parse(data);
  }

  async getUsernames(): Promise<string[]> {
    const data = await this.getData();
    return Object.keys(data);
  }

  async getUser(username: string): Promise<User | null> {
    const data = await this.getData();
    const users = await this.getUsernames();

    if (!users.includes(username)) {
      return null;
    }

    return data[username];
  }
}
