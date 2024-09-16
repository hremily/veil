import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://milunchik:3MpK7aRInEfQFUZn@veilcluster.xw8xy.mongodb.net/?retryWrites=true&w=majority&appName=VeilCluster"
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
