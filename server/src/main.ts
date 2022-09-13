import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('MiBot')
    .setDescription("Document REST APi")
    .setVersion('1.0.0')
    .setContact('Sarvar', '', 's.yolchiyev1@gmail.com')
    .addTag('Documnet Instractur REST API')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document)
  
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
  
}

start()