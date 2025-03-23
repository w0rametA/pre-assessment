import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ProductTranslationDto {
  @ApiProperty({
    example: 'en',
    description: 'Language code with 2 letter',
  })
  @IsString()
  @IsNotEmpty()
  languageCode: string

  @ApiProperty({
    example: 'Smartphone',
    description: 'Product name in specified language',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    example: 'High-performance smartphone with advanced camera',
    description: 'Product description in specified language',
  })
  @IsString()
  @IsNotEmpty()
  description: string
}

export class ProductTranslationResponseDto {
  @ApiProperty()
  languageCode: string

  @ApiProperty()
  name: string

  @ApiProperty()
  description: string
}
