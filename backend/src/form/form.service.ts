import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormSubmission } from '../entity/form.entity';
import { SubmitFormDto } from '../dto/form.dto';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(FormSubmission)
    private readonly formSubmissionRepository: Repository<FormSubmission>,
  ) {}

  async saveSubmission(userId: number, data: SubmitFormDto) {
    const submission = this.formSubmissionRepository.create({
      userId,
      ...data,
    });
    await this.formSubmissionRepository.save(submission);
    return { success: true };
  }
}
