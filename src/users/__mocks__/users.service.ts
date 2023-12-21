import { userStub } from '../test/stubs/user.stab';

export const UsersService = jest.fn().mockReturnValue({
  find: jest.fn().mockResolvedValue([userStub()]),
  create: jest.fn().mockResolvedValue(userStub()),
  findOneAndUpdate: jest.fn().mockResolvedValue(userStub()),
});
