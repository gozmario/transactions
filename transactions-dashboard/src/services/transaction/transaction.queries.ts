import { gql } from "@apollo/client";
import { Transaction } from "./transaction.atom";

export interface GetTransactionData {
  findAlltransaction: Transaction[];
}
export interface CreateTransactionData {
  createTransaction: Transaction;
}

export interface UpdateTransactionData {
  updateTransaction: Transaction;
}

export interface RemoveTransactionData {
  removeTransaction: Transaction[];
}

export const GET_TRANSACTION = gql`
  query findAlltransaction($filterTransactionInput: FilterTransactionInput) {
    findAlltransaction(filterTransactionInput: $filterTransactionInput) {
      id
      summary
      category
      sum
      currency
      paid
    }
  }
`;

export const CREATE_TRANSACTION = gql`
  mutation createTransaction($createTransactionInput: CreateTransactionInput!) {
    createTransaction(createTransactionInput: $createTransactionInput) {
      id
      summary
      category
      sum
      currency
      paid
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation updateTransaction($updateTransactionInput: UpdateTransactionInput!) {
    updateTransaction(updateTransactionInput: $updateTransactionInput) {
      id
      summary
      category
      sum
      currency
      paid
    }
  }
`;

export const REMOVE_TRANSACTION = gql`
  mutation removeTransaction($removeId: Int!) {
    removeTransaction(id: $removeId) {
      id
      summary
      category
      sum
      currency
      paid
    }
  }
`;
