export interface Transaction {
  date: Date;
  label: string;
  amount: number;
  credit: number;
  credit_ht?: number;
  debit: number;
  TVA: number;
  solde: number;
}
