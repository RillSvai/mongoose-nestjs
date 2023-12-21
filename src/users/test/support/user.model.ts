import { MockModel } from 'src/database/test/support/mock.model';
import { userStub } from '../stubs/user.stab';
import { User } from 'src/users/schemas/user.schema';

export class UserModel extends MockModel<User> {
  protected entityStub: User = userStub();
}
