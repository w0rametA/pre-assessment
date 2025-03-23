import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from './entities/product.entity'
import { ProductTranslation } from './entities/product.translation.entity'
import { ProductController } from './controllers/product.controller'
import { ProductService } from './services/product.service'
import { ProductTranslationService } from './services/product.translation.service'

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductTranslation])],
  controllers: [ProductController],
  providers: [ProductService, ProductTranslationService],
})
export class ProductModule {}
