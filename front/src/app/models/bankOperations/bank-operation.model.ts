export interface BankOperation {
    accountNumber: string;
    type: 'withdrawal' | 'deposit' | 'loan';
    amount: number;  // Changed amount to just number
    date: string;
    interest?: number | null;
    payments?: number | null;
  }
  