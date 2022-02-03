import { CarerEntity, ClientEntity, Response } from './api';

export const isCarer = (response: Response): response is CarerEntity => {
  return response.type === 'carerEntity';
};

export const isClient = (response: Response): response is ClientEntity => {
  return response.type === 'client';
};
