import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionCategory } from './transaction.model';

@Entity()
@ObjectType()
export class Transaction {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  summary: string;

  @Column()
  @Field(() => TransactionCategory)
  category: TransactionCategory;

  @Column()
  @Field(() => Int)
  sum: number;

  @Column()
  @Field(() => String)
  currency: string;

  @Column()
  @Field(() => Date)
  paid: Date;
}
