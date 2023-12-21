import { Test } from '@nestjs/testing';
import { UsersRepository } from '../users.repository';
import { getModelToken } from '@nestjs/mongoose';
import { UserModel } from './support/user.model';
import { User } from '../schemas/user.schema';
import { userStub } from './stubs/user.stab';

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;
  let userModel: UserModel;
  const filterQuery = { id: userStub().id };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: getModelToken(User.name),
          useClass: UserModel,
        },
      ],
    }).compile();

    usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
    userModel = moduleRef.get<UserModel>(getModelToken(User.name));

    jest.clearAllMocks();
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let user: User | null;

      beforeEach(async () => {
        jest.spyOn(userModel, 'findOne');
        user = await usersRepository.findOne(filterQuery);
      });

      test('it should call the userModel', () => {
        expect(userModel.findOne).toHaveBeenCalledWith(filterQuery, { _id: 0 });
      });

      test('then it should return user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('find', () => {
    describe('when find is called', () => {
      let users: User[];

      beforeEach(async () => {
        jest.spyOn(userModel, 'find');
        users = await usersRepository.find(filterQuery);
      });

      test('it should call the userModel', () => {
        expect(userModel.find).toHaveBeenCalledWith(filterQuery, { _id: 0 });
      });

      test('then it should return array of users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('findOneAndUpdate', () => {
    describe('when findOneAndUpdate is called', () => {
      let user: User | null;

      beforeEach(async () => {
        jest.spyOn(userModel, 'findOneAndUpdate');
        user = await usersRepository.findOneAndUpdate(filterQuery, userStub());
      });

      test('it should call the userModel', () => {
        expect(userModel.findOneAndUpdate).toHaveBeenCalledWith(
          filterQuery,
          userStub(),
          { new: true },
        );
      });

      test('then it should return user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
