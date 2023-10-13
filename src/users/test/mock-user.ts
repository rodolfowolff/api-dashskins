import { User } from '../schema/user.schema';

export const mockUser = (
  username = 'John Doe',
  email = 'john@doe',
  age = 4,
  avatar = 'https://example.com/avatar.jpg',
): Partial<User> => ({
  username,
  email,
  age,
  avatar,
});

export const usersArray = [
  mockUser(),
  mockUser('Vitani', 'a@b.com', 2, 'https://example.com/vitani.jpg'),
  mockUser('Simba', 't@b.com', 14, 'https://example.com/simba.jpg'),
];
