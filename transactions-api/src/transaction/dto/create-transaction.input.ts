import { InputType, Int, Field } from '@nestjs/graphql';
import { TransactionCategory } from '../entities/transaction.model';

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  summary: string;

  @Field(() => TransactionCategory)
  category: TransactionCategory;

  @Field(() => Int)
  sum: number;

  @Field(() => String)
  currency: string;

  @Field(() => Date)
  paid: Date;
}
