export interface Transaction {
  date: string;
  label: string;
  amount: number;
  credit: number;
  credit_ht?: number;
  debit: number;
  TVA: number;
}
