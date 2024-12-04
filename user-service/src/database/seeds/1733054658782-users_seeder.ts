import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { createUserFactory } from '../factories/user.factoty';
import { User } from '../../user/user.entity';

export class UsersSeeder1733054658782 implements Seeder {
  track = false;
  batchSize = 10000;

  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const totalUsers = 1000000;
    let users = [];

    for (let i = 0; i < totalUsers; i += this.batchSize) {
      for (let j = 0; j < this.batchSize; j++) {
        users.push(createUserFactory());
      }
      await userRepository.save(users);
      users = [];
    }
  }
}
