import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('update-has-issues')
  async updateHasIssuesFlag(): Promise<{ updatedCount: number }> {
    const updatedCount = await this.userService.updateHasIssuesFlag();
    return { updatedCount };
  }
}
