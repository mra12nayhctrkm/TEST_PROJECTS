import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async updateHasIssuesFlag(): Promise<number> {
    const usersWithIssuesCount = await this.userRepository.count({
      where: { hasIssues: true },
    });

    await this.userRepository.update({ hasIssues: true }, { hasIssues: false });

    return usersWithIssuesCount;
  }
}
