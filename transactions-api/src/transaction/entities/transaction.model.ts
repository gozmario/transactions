import { registerEnumType } from '@nestjs/graphql';

export enum TransactionCategory {
  housing = 'housing',
  travel = 'travel',
  food = 'food',
  utilities = 'utilities',
  insurance = 'insurance',
  healthcare = 'healthcare',
  financial = 'financial',
  lifestyle = 'lifestyle',
  entertainment = 'entertainment',
  miscellaneous = 'miscellaneous',
}

registerEnumType(TransactionCategory, {
  name: 'TransactionCategory',
});
