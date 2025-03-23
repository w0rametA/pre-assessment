import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { env } from 'src/constant/enviroment.constant'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.databasae.dbname,
      port: env.databasae.port,
      username: env.databasae.username,
      password: env.databasae.password,
      database: env.databasae.dbname,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: env.databasae.sync,
      logging: ['schema', 'error', 'warn'],
    }),
  ],
})
export class DatabaseModule {}
