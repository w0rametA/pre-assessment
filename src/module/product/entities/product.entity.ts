import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'
import { BaseEntity } from 'src/common/entities/base.entity'
import { IProduct } from '../interfaces/product.interface'
import { ProductTranslation } from './product.translation.entity'

@Entity()
export class Product extends BaseEntity implements IProduct {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  sku: string

  @Column()
  price: number

  @Column({ default: true })
  isActive: boolean

  @OneToMany(
    () => ProductTranslation,
    (ProductTranslation) => ProductTranslation.product,
    {
      cascade: true,
      eager: true,
    },
  )
  translations: ProductTranslation[]
}
