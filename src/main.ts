import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as c from 'config'
import { ApplicationModule } from './app.module'

async function bootstrap() {
  // await runMigration()
  const app = await NestFactory.create(ApplicationModule)
  initSwagger(app)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}

const initSwagger = (app) => {
  const options = new DocumentBuilder()
    .setTitle('Handmade API')
    .setDescription('Handmade API documentation')
    .setVersion('1.0')
    // .addTag('cats')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
}


bootstrap()
