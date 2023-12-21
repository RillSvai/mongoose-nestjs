import { Test } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { User } from '../schemas/user.schema';
import { UsersRepository } from '../users.repository';
import { getModelToken } from '@nestjs/mongoose';
import { UserModel } from './support/user.model';
import { userStub } from './stubs/user.stab';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

jest.mock('../users.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersRepository,
        UsersService,
        {
          provide: getModelToken(User.name),
          useClass: UserModel,
        },
      ],
    }).compile();
    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('find', () => {
    describe('when find is called', () => {
      let users: User[];
      beforeEach(async () => {
        users = await usersController.find();
      });

      test('it should call usersService', () => {
        expect(usersService.find).toHaveBeenCalled();
      });

      test('then it should return array of users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('findOneById', () => {
    describe('when findOneById is called', () => {
      let user: User;
      beforeEach(async () => {
        user = await usersController.findOneById(userStub());
      });

      test('it should return user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('create', () => {
    describe('when create is called', () => {
      let user: User;
      let createUserDto: CreateUserDto;
      beforeEach(async () => {
        createUserDto = { ...userStub() };
        user = await usersController.create(createUserDto);
      });

      test('it should call usersService', () => {
        expect(usersService.create).toHaveBeenCalledWith(createUserDto);
      });

      test('then it should return a new user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('findOneAndUpdate', () => {
    describe('when findOneAndUpdate is called', () => {
      let user: User | null;
      let updateUserDto: UpdateUserDto;
      beforeEach(async () => {
        const stub: User = userStub();
        updateUserDto = { ...stub };
        user = await usersController.update(stub.id, updateUserDto);
      });

      test('it should call usersService', () => {
        expect(usersService.findOneAndUpdate).toHaveBeenCalledWith(
          userStub().id,
          updateUserDto,
        );
      });

      test('then it should return updated user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
