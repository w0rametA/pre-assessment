import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  ValidateNested,
  ArrayMinSize,
  IsArray,
  IsInt,
  Min,
  Max,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import {
  ProductTranslationDto,
  ProductTranslationResponseDto,
} from './product.translation.dto'
import { Transform, Type } from 'class-transformer'

export class ProductCreateDTO {
  @ApiProperty({ example: 'PROD-12345', description: 'Unique product SKU' })
  @IsString()
  @IsNotEmpty()
  sku: string

  @ApiProperty({ example: 599.99, description: 'Product price' })
  @IsNumber()
  price: number

  @ApiProperty({
    example: true,
    description: 'Product availability status',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean

  @ApiProperty({
    type: [ProductTranslationDto],
    description: 'Product translations for different languages',
  })
  @ValidateNested({ each: true })
  @Type(() => ProductTranslationDto)
  @ArrayMinSize(1)
  translations: ProductTranslationDto[]
}

export class ProductResponseDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  sku: string

  @ApiProperty()
  price: number

  @ApiProperty()
  isActive: boolean

  @ApiProperty()
  createdAt: string

  @ApiProperty()
  updatedAt: string

  @ApiProperty({ type: [ProductTranslationResponseDto] })
  translations: ProductTranslationResponseDto[]
}

export class ProductSearchDto {
  @ApiProperty({
    required: false,
    example: 'phone',
    description: 'Search term for product name',
  })
  @IsOptional()
  @IsString()
  searchTerm?: string

  @ApiProperty({
    required: false,
    example: 1,
    default: 1,
    description: 'Page number',
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value) || 1)
  page?: number = 1

  @ApiProperty({
    required: false,
    example: 10,
    default: 10,
    description: 'Items per page',
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value) || 10)
  limit?: number = 10
}

export class PaginatedProductsResponseDto {
  @ApiProperty({ type: [ProductResponseDto] })
  items: ProductResponseDto[]

  @ApiProperty()
  total: number

  @ApiProperty()
  page: number

  @ApiProperty()
  limit: number

  @ApiProperty()
  totalPages: number
}
