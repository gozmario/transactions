import { CreateTransactionInput } from './create-transaction.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class FilterTransactionInput extends PartialType(
  CreateTransactionInput,
) {
  @Field(() => Int, { nullable: true })
  id?: number;
}
