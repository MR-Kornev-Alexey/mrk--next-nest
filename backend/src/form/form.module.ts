import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { FormSubmission } from '../entity/form.entity';
import { User } from '../entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormSubmission, User])],
  controllers: [FormController],
  providers: [FormService],
  exports: [FormService],
})
export class FormModule {}
