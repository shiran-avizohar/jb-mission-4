export interface BankOperation {
accountNumber: string;
type: 'withdrawal' | 'deposit' | 'loan';
amount: number;
date: string;
interest?: number;
payments?: number;
}
  