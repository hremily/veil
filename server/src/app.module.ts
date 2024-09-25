import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserSchema } from './user/user.schema';
import { RoleSchema } from './user/auth/role.schema';
import { TeacherSchema } from './teacher/teacher.schema';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { AuthModule } from './user/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const uri =
          config.get<string>('USER_LOCATION') === 'local'
            ? `mongodb://${config.get<string>('DB_USER')}:${config.get<string>('DB_PASSWORD')}@${config.get<string>('DB_HOST')}:${config.get<string>('DB_PORT')}/${config.get<string>('DB_NAME')}`
            : `mongodb+srv://${config.get<string>('DB_USER')}:${config.get<string>('DB_PASSWORD')}@${config.get<string>('DB_CLUSTER')}.${config.get<string>('DB_HASH')}.mongodb.net/${config.get<string>('DB_NAME')}?retryWrites=true&w=majority&appName=VeilCluster`;

        return { uri };
      },
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Role', schema: RoleSchema },
      { name: 'Teacher', schema: TeacherSchema },
    ]),
    AuthModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
