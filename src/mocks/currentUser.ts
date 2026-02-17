import type { User } from '../types';

export let currentUser: User = {
  id: '102',
  username: 'jane_admin',
  email: 'jane@example.com',
  role: 'admin',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const setCurrentUserRole = (role: 'user' | 'admin') => {
  currentUser.role = role;
};