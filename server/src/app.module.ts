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
        const uri = config.get<string>("NODE_ENV") === 'local' ? 
        `mongodb://${config.get<string>("DB_USER")}:${config.get<string>("DB_PASSWORD")}@${config.get<string>("DB_HOST")}:${config.get<string>("DB_PORT")}/${config.get<string>("DB_NAME")}` : 
        `mongodb+srv://${config.get<string>("DB_USER")}:${config.get<string>("DB_PASSWORD")}@${config.get<string>("DB_CLUSTER")}.${config.get<string>("DB_HASH")}.mongodb.net/${config.get<string>("DB_NAME")}?retryWrites=true&w=majority&appName=VeilCluster`;

      return {
        uri

  }}
    }),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
