import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { secret } from '../config/secret';
const session = require('express-session');
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:9000',
    credentials: true,
  });

  app.use(
    session({
      secret: secret,
      resave: false,
      saveUninitialized: false,
      cookie: { httpOnly: true },
      // cookie: { secure: process.env.NODE_ENV === 'production' }
    }),
  );

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
