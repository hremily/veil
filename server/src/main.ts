import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import secret from '../config/secret';
const session = require('express-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: secret,
      resave: false,
      saveUninitialized: false,
      cookie: { httpOnly: true },
      //cookie: { secure: process.env.NODE_ENV === 'production' }
    }),
  );

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
