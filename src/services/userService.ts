import type { User, CreateUserData, UpdateUserData } from '@/types/user';

const USERS_STORAGE_KEY = 'users';

// Initialize with some mock users if none exist
const initializeUsers = (): User[] => {
  const existingUsers = localStorage.getItem(USERS_STORAGE_KEY);
  if (existingUsers !== null) {
    try {
      return JSON.parse(existingUsers) as User[];
    } catch {
      localStorage.removeItem(USERS_STORAGE_KEY);
    }
  }

  const mockUsers: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      createdAt: '2024-01-02T00:00:00.000Z',
      updatedAt: '2024-01-02T00:00:00.000Z',
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      createdAt: '2024-01-03T00:00:00.000Z',
      updatedAt: '2024-01-03T00:00:00.000Z',
    },
  ];

  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(mockUsers));
  return mockUsers;
};

const getUsers = (): User[] => {
  return initializeUsers();
};

const createUser = async (userData: CreateUserData): Promise<User> => {
  const users = getUsers();
  const newUser: User = {
    id: Date.now().toString(),
    ...userData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return newUser;
};

const updateUser = async (
  id: string,
  userData: UpdateUserData,
): Promise<User> => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex === -1) {
    throw new Error('User not found');
  }

  const existingUser = users[userIndex];
  if (!existingUser) {
    throw new Error('User not found');
  }

  const updatedUser: User = {
    id: existingUser.id,
    name: userData.name ?? existingUser.name,
    email: userData.email ?? existingUser.email,
    createdAt: existingUser.createdAt,
    updatedAt: new Date().toISOString(),
  };

  users[userIndex] = updatedUser;
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return updatedUser;
};

const deleteUser = async (id: string): Promise<void> => {
  const users = getUsers();
  const filteredUsers = users.filter(user => user.id !== id);

  if (filteredUsers.length === users.length) {
    throw new Error('User not found');
  }

  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(filteredUsers));

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
};

export const userService = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
