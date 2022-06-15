import { atom } from "recoil";

export enum TransactionCategory {
  housing = "housing",
  travel = "travel",
  food = "food",
  utilities = "utilities",
  insurance = "insurance",
  healthcare = "healthcare",
  financial = "financial",
  lifestyle = "lifestyle",
  entertainment = "entertainment",
  miscellaneous = "miscellaneous",
}

export interface Transaction {
  id: string;
  summary: string;
  category: TransactionCategory;
  sum: number;
  currency: string;
  paid: Date | null;
}

export const transactionsAtom = atom<Transaction[]>({
  key: "transactions",
  default: [],
});

export interface TransactionFilter {
  category: TransactionCategory | "all";
}

export const transactionFilterAtom = atom<TransactionFilter>({
  key: "transactionFilter",
  default: {
    category: "all",
  },
});

export function mapFilterFoQuery(filter: TransactionFilter) {
  const { category } = filter;
  return {
    ...filter,
    category: category === "all" ? null : category,
  };
}
