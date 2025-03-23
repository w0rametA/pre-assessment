import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, ILike, In, Repository } from 'typeorm'
import { ProductTranslation } from '../entities/product.translation.entity'
import {
  PaginatedProductsResponseDto,
  ProductSearchDto,
} from '../dtos/product.dto'
import { Product } from '../entities/product.entity'

@Injectable()
export class ProductTranslationService {
  constructor(
    @InjectRepository(ProductTranslation)
    private productTranslationRepository: Repository<ProductTranslation>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findByNames(
    productNames: string[],
  ): Promise<ProductTranslation | null> {
    return this.productTranslationRepository.findOne({
      where: {
        name: In(productNames),
      },
    })
  }

  async search(
    searchDto: ProductSearchDto,
  ): Promise<PaginatedProductsResponseDto> {
    const { searchTerm, page = 1, limit = 10 } = searchDto

    try {
      const baseCondition: FindOptionsWhere<Product> = {
        isActive: true,
      }

      let conditions: FindOptionsWhere<Product>[] = [baseCondition]

      if (searchTerm && searchTerm.trim()) {
        const trimmedSearchTerm = searchTerm.trim()

        conditions = [
          {
            isActive: true,
            translations: [
              {
                name: ILike(`%${trimmedSearchTerm}%`),
              },
            ],
          },
          {
            isActive: true,
            translations: [
              {
                description: ILike(`%${trimmedSearchTerm}%`),
              },
            ],
          },
        ]
      }
      const [items, total] = await this.productRepository.findAndCount({
        where: conditions,
        relations: ['translations'],
        skip: (page - 1) * limit,
        take: limit,
        order: {
          id: 'ASC',
        },
      })

      return {
        items,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      }
    } catch (error) {
      console.error('Search error:', error.message || error)
      return {
        items: [],
        total: 0,
        page,
        limit,
        totalPages: 1,
      }
    }
  }
}
