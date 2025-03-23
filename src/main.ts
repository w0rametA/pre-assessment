import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable validation pipe for DTOs
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  // Set up Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Multilingual Product API')
    .setDescription(
      'API for creating and searching products in multiple languages',
    )
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(3000)
}
bootstrap()
