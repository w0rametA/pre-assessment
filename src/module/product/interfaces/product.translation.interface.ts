import { IProduct } from './product.interface'

export interface IProductTranslation {
  id: number
  productId: number
  languageCode: string
  name: string
  description: string
  product: IProduct
}
