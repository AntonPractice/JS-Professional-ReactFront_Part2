import type { User } from '../types';

export const mockUsers: User[] = [
  {
    id: '101',
    username: 'john_doe',
    email: 'john@example.com',
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '102',
    username: 'jane_admin',
    email: 'jane@example.com',
    role: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];