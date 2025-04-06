import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-new-operation',
  templateUrl: './new-operation.component.html',
  styleUrls: ['./new-operation.component.css'],
  imports: [NgIf]
})
export class NewOperationComponent {
  accountNumber = signal<string>('');
  operationType = signal<'deposit' | 'withdrawal' | 'loan'>('deposit');
  amount = signal<number | undefined>(undefined);
  payments = signal<number | undefined>(undefined);
  interest = signal<number | undefined>(undefined);

  getInputValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  setOperationType(event: Event): void {
    const value = this.getInputValue(event);
    this.operationType.set(value as 'deposit' | 'withdrawal' | 'loan');
  }

  saveOperation() {
    const operation = {
      accountNumber: this.accountNumber(),
      type: this.operationType(),
      amount: this.amount(),
      payments: this.payments(),
      interest: this.interest()
    };

    console.log('Saving operation:', operation);
    // Add API call here!
  }
}