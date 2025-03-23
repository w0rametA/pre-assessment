import { BaseEntity } from 'src/common/entities/base.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Product } from 'src/module/product/entities/product.entity'
import { IProductTranslation } from '../interfaces/product.translation.interface'

@Entity()
export class ProductTranslation
  extends BaseEntity
  implements IProductTranslation
{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  productId: number

  @Column()
  languageCode: string

  @Column()
  name: string

  @Column()
  description: string

  @ManyToOne(() => Product, (product) => product.translations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: Product
}
