import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormModule } from './form/form.module';
import { AuthModule } from './auth/auth.module';
import { User } from './entity/user.entity';
import { FormSubmission } from './entity/form.entity';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // делает ConfigService доступным везде
      envFilePath: '.env', // путь к файлу .env (по умолчанию)
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User, FormSubmission],
        synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
        logging: configService.get('DB_LOGGING') === 'true',
        connectTimeout: 10000, // 10 секунд
        charset: 'utf8mb4', // <-- важно
        extra: {
          charset: 'utf8mb4_unicode_ci', // <-- важно
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    FormModule,
    HealthModule,
  ],
})
export class AppModule {}
