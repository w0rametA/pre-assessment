import { IProductTranslation } from './product.translation.interface.js'

export interface IProduct {
  id: number
  sku: string
  price: number
  isActive: boolean
  translations: IProductTranslation[]
}
