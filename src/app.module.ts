import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { ProductModule } from './module/product/product.module'

@Module({
  imports: [DatabaseModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
