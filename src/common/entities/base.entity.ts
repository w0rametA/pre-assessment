import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'
import { IBaseEntity } from '../interfaces/common.interface'

export class BaseEntity implements IBaseEntity {
  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt: string

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt: string

  @DeleteDateColumn({
    type: 'timestamptz',
  })
  deletedAt: string
}
