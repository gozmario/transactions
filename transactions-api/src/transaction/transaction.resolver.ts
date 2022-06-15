import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { FilterTransactionInput } from './dto/filter-transaction.input';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Mutation(() => Transaction)
  createTransaction(
    @Args('createTransactionInput')
    createTransactionInput: CreateTransactionInput,
  ) {
    return this.transactionService.create(createTransactionInput);
  }

  @Query(() => [Transaction])
  findAlltransaction(
    @Args('filterTransactionInput', { nullable: true })
    filterTransactionInput?: FilterTransactionInput,
  ) {
    return this.transactionService.findAll(filterTransactionInput);
  }

  @Mutation(() => Transaction)
  updateTransaction(
    @Args('updateTransactionInput')
    updateTransactionInput: UpdateTransactionInput,
  ) {
    return this.transactionService.update(updateTransactionInput);
  }

  @Mutation(() => [Transaction])
  removeTransaction(@Args('id', { type: () => Int }) id: number) {
    return this.transactionService.remove(id);
  }
}
