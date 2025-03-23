import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ProductService } from '../services/product.service'
import {
  PaginatedProductsResponseDto,
  ProductCreateDTO,
  ProductResponseDto,
  ProductSearchDto,
} from '../dtos/product.dto'
import { ProductTranslationService } from '../services/product.translation.service'
import { matchesLanguage } from 'src/util/language.util'

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productTranslationService: ProductTranslationService,
  ) {}

  @Get()
  @ApiOperation({ description: 'Get all product' })
  @ApiResponse({ status: 200, description: 'Get all product successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findAll(): Promise<ProductResponseDto[]> {
    try {
      return await this.productService.findAll()
    } catch (error) {
      console.error('error findAll product ', error)
      throw error
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product with multilingual support' })
  @ApiResponse({ status: 201, description: 'Product successfully created' })
  @ApiResponse({ status: 400, description: 'Duplicated Product sku or name' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(
    @Body() createProductDto: ProductCreateDTO,
  ): Promise<ProductResponseDto> {
    try {
      const { translations, sku } = createProductDto
      const productCreateNames = translations.map((tr) => tr.name)

      const exisitingProductSku = await this.productService.findBySKU(sku)
      const exisitingProductName =
        await this.productTranslationService.findByNames(productCreateNames)

      if (exisitingProductSku) {
        throw new BadRequestException(
          `Duplicated Product with Sku ${createProductDto.sku}`,
        )
      }
      if (exisitingProductName) {
        throw new BadRequestException(
          `Duplicated Product with name ${exisitingProductName.name}`,
        )
      }

      const validateResult = translations.filter(
        (tr) =>
          matchesLanguage(tr.name, tr.languageCode) &&
          matchesLanguage(tr.description, tr.languageCode),
      )

      const payload = { ...createProductDto, translations: validateResult }

      return this.productService.create(payload)
    } catch (error) {
      console.error('error createProduct ', error)
      throw error
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Product details' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findOne(@Param('id') id: number): Promise<ProductResponseDto> {
    const product = await this.productService.findById(id)
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }
    return product
  }

  @Get('search')
  @ApiOperation({ summary: 'Search for products in any language' })
  @ApiResponse({
    status: 200,
    description: 'Products found',
    type: PaginatedProductsResponseDto,
  })
  async search(
    @Query() searchDto: ProductSearchDto,
  ): Promise<PaginatedProductsResponseDto> {
    try {
      return await this.productTranslationService.search(searchDto)
    } catch (error) {
      console.error('error searchProduct ', error)
      throw error
    }
  }
}
