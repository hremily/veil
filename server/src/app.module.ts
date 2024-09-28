import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSchema } from './user/user.schema';
import { TeacherSchema } from './teacher/teacher.schema';
import { UserService } from './user/user.service';
import { TeacherService } from './teacher/teacher.service';
import { AuthModule } from './user/auth/auth.module';
import { CustomMailerService } from './mail/mail.service';
import { UserModule } from './user/user.module';
import { TeacherModule } from './teacher/teacher.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'emili061116@gmail.com',
          pass: 'novuy parol',
        },
      },
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const uri =
          config.get<string>('USER_LOCATION') === 'local'
            ? `mongodb://${config.get<string>('DB_USER')}:${config.get<string>('DB_PASSWORD')}@${config.get<string>('DB_HOST')}:${config.get<string>('DB_PORT')}/${config.get<string>('DB_NAME')}`
            : `mongodb+srv://${config.get<string>('DB_USER')}:${config.get<string>('DB_PASSWORD')}@${config.get<string>('DB_CLUSTER')}.${config.get<string>('DB_HASH')}.mongodb.net/${config.get<string>('DB_NAME')}?retryWrites=true&w=majority&appName=VeilCluster`;

        console.log('MongoDB URI:', uri);
        return { uri };
      },
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Teacher', schema: TeacherSchema },
    ]),
    AuthModule,
    UserModule,
    TeacherModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, TeacherService, CustomMailerService],
})
export class AppModule {}
