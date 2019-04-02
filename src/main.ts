import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ApplicationModule } from './app.module'

async function bootstrap() {
  // await runMigration()
  const app = await NestFactory.create(ApplicationModule)
  initSwagger(app)
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api')
  await app.listen(3000)
}

const initSwagger = (app) => {
  const options = new DocumentBuilder()
    .setTitle('Handmade API')
    .setDescription('Handmade API documentation')
    .setVersion('1.0')
    .setBasePath('/api')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('swagger', app, document)
}


bootstrap()
