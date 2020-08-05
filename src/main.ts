import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ApplicationModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule)
  initSwagger(app)
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
  await app.listen(3000)
}

const initSwagger = (app) => {
  const options = new DocumentBuilder()
    .setTitle('Handmade API')
    .setDescription('Handmade API documentation')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
}


bootstrap()
