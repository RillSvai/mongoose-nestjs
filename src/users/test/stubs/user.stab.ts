import { User } from '../../schemas/user.schema';

export const userStub = (): User => {
  return {
    id: '1',
    email: 'test1@gmail.com',
    age: 18,
    favoriteFoods: ['grape', 'peach'],
  };
};
