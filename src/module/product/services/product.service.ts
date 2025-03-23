import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from '../entities/product.entity'
import { Repository } from 'typeorm'
import { ProductTranslation } from '../entities/product.translation.entity'
import { ProductCreateDTO } from '../dtos/product.dto'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find()
  }

  async findById(prouductId): Promise<Product | null> {
    return this.productRepository.findOne({
      where: {
        id: prouductId,
      },
      relations: ['translations'],
    })
  }

  async findBySKU(sku: string): Promise<Product | null> {
    return this.productRepository.findOne({
      where: {
        sku,
      },
    })
  }

  async create(productCreateData: ProductCreateDTO): Promise<Product> {
    return this.productRepository.save(productCreateData)
  }
}
