import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'transactions_database',
      port: 5432,
      database: 'transactions_admin_db',
      username: 'admin',
      password: 'admin1234',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true, // for dev mode only
    }),
    TransactionModule,
  ],
})
export class AppModule {}
