import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-new-operation',
  templateUrl: './new-operation.component.html',
  styleUrls: ['./new-operation.component.css']
})
export class NewOperationComponent {
  
  // Signals for the input fields
  accountNumber = signal<string>('');
  operationType = signal<'deposit' | 'withdrawal' | 'loan'>('deposit');
  amount = signal<number | undefined>(undefined);
  payments = signal<number | undefined>(undefined);
  interest = signal<number | undefined>(undefined);

  // Save operation function (you can define the actual logic for saving the operation here)
  saveOperation() {
    const operation = {
      accountNumber: this.accountNumber(),
      type: this.operationType(),
      amount: this.amount(),
      payments: this.payments(),
      interest: this.interest()
    };
    
    console.log('Saving operation:', operation);
    // Here you would typically make an API call to save the operation.
  }
}
