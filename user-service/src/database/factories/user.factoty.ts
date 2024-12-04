import { faker } from '@faker-js/faker';
import { User } from '../../user/user.entity';

export const createUserFactory = (): User => {
  const user = new User();
  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.age = faker.number.int({ min: 1, max: 90 });
  user.gender = faker.person.sex();
  user.hasIssues = faker.datatype.boolean();
  return user;
};
