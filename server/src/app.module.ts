import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule, ConfigService} from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          uri: `mongodb+srv://milunchik:${config.get<string>('DB_PASSWORD')}@${config.get<string>('DB_CLUSTER')}.xw8xy.mongodb.net/?retryWrites=true&w=majority&appName=VeilCluster`,
        };
      }
    }),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
