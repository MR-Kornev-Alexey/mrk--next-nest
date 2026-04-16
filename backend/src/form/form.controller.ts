// form.controller.ts
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';

import { FormService } from './form.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { JwtAuthGuard } from '../auth/wt-auth.guard';
import { SubmitFormDto } from '../dto/form.dto';

interface AuthenticatedRequest extends Request {
  user: { userId: number; email: string };
}

@Controller('form')
export class FormController {
  constructor(
    private readonly formService: FormService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  @Post('submit')
  @UseGuards(JwtAuthGuard)
  async submitForm(
    @Request() req: AuthenticatedRequest,
    @Body() formData: SubmitFormDto,
  ) {
    const userId = req.user.userId;
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    console.log('user -', user);

    // Перезаписываем name и email из аккаунта (источник правды)
    if (user) {
      formData.name = user.name;
      formData.email = user.email;
    }

    return this.formService.saveSubmission(userId, formData);
  }
}
