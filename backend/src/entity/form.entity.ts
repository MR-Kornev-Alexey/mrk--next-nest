import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('form_submissions')
export class FormSubmission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'int', nullable: true })
  userId: number;

  @Column({ name: 'consent', type: 'boolean', default: false })
  consent: boolean;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ name: 'email', type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({
    name: 'email_confirm',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  emailConfirm: string;

  @Column({ name: 'messenger', type: 'varchar', length: 100, nullable: true })
  messenger: string;

  @Column({
    name: 'messenger_account',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  messengerAccount: string;

  @Column({
    name: 'contact_time_1',
    type: 'enum',
    enum: ['morning', 'day', 'evening'],
    default: 'day',
  })
  contactTime_1: string;

  @Column({ name: 'children_2', type: 'json', nullable: true })
  children_2: { name: string; age: string }[];

  @Column({ name: 'caregivers_3_1', type: 'json', nullable: true })
  caregivers_3_1: string[];

  @Column({ name: 'caregivers_other_3_2', type: 'text', nullable: true })
  caregiversOther_3_2: string;

  @Column({ name: 'reaction_to_no_4', type: 'text', nullable: true })
  reactionToNo_4: string;

  @Column({
    name: 'last_word_5',
    type: 'enum',
    enum: ['me', 'child', 'nanny', 'noRules'],
    nullable: true,
  })
  lastWord_5: string;

  @Column({ name: 'previous_experience_text_6', type: 'text', nullable: true })
  previousExperienceText_6: string;

  @Column({ name: 'parental_fears_7', type: 'json', nullable: true })
  parentalFears_7: string[];

  @Column({ name: 'parental_fears_other_7', type: 'text', nullable: true })
  parentalFearsOther_7: string;

  @Column({ name: 'character_traits_8', type: 'json', nullable: true })
  characterTraits_8: string[];

  @Column({ name: 'character_traits_other_8', type: 'text', nullable: true })
  characterTraitsOther_8: string;

  @Column({
    name: 'budget_9',
    type: 'enum',
    enum: ['up_to_50k', '100k_150k', '150k_300k', 'over_300k'],
    nullable: true,
  })
  budget_9: string;

  @Column({
    name: 'readiness_10',
    type: 'enum',
    enum: ['ready_to_change', 'only_child'],
    nullable: true,
  })
  readiness_10: string;

  @Column({
    name: 'daily_connection_11',
    type: 'enum',
    enum: ['yes', 'no'],
    nullable: true,
  })
  dailyConnection_11: string;

  @Column({ name: 'expected_changes_12', type: 'text', nullable: true })
  expectedChanges_12: string;

  @Column({ name: 'internal_state_change_13', type: 'text', nullable: true })
  internalStateChange_13: string;

  @Column({ name: 'final_notes_14', type: 'text', nullable: true })
  finalNotes_14: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'ip_address', type: 'varchar', length: 45, nullable: true })
  ipAddress: string;
}
