export interface BankOperation {
accountNumber: string;
type: 'withdrawal' | 'deposit' | 'loan';
amount: number | null;
date: string;
interest?: number| null;
payments?: number| null;
}
  