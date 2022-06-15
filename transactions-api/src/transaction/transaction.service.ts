import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { FilterTransactionInput } from './dto/filter-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  create(createTransactionInput: CreateTransactionInput): Promise<Transaction> {
    const newTransaction = this.transactionRepository.create(
      createTransactionInput,
    );
    return this.transactionRepository.save(newTransaction);
  }

  findAll(
    filterTransactionInput?: FilterTransactionInput,
  ): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: filterTransactionInput,
    });
  }

  update(updateTransactionInput: UpdateTransactionInput): Promise<Transaction> {
    return this.transactionRepository.save(updateTransactionInput);
  }

  async remove(id: number): Promise<Transaction[]> {
    await this.transactionRepository.delete(id);
    return this.transactionRepository.find();
  }
}
