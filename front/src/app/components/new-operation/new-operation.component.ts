// src/app/components/new-operation/new-operation.component.ts

import { Component, OnInit, signal } from '@angular/core';
import { BankOperationsService } from '../../services/bank-operations.service'; // Import service
import { BankOperation } from '../../models/bankOperations/bank-operation.model';

@Component({
  selector: 'app-new-operation',
  templateUrl: './new-operation.component.html',
  styleUrls: ['./new-operation.component.css']
})
export class NewOperationComponent implements OnInit {
  accountNumber = '';  // Input for account number
  selectedAction = 'withdrawal';  // Default action (withdrawal)
  amount = 0;  // Amount input for withdrawal/deposit
  payments = 0;  // Payments input for loan
  interest = 0;  // Interest input for loan
  operations = signal<BankOperation[]>([]);  // Signal to hold the list of operations

  constructor(
    public bankOperationsService: BankOperationsService
  ) {}

  ngOnInit(): void {}

  // Method to handle saving an operation
  async saveOperation(): Promise<void> {
    const operation = {
      accountNumber: this.accountNumber,
      type: this.selectedAction,
      amount: this.amount,
      payments: this.selectedAction === 'loan' ? this.payments : undefined,
      interest: this.selectedAction === 'loan' ? this.interest : undefined,
    };

    try {
      // Send the operation data to the backend via the service
      const result = await this.bankOperationsService.addOperation(operation);
      this.operations.set([result, ...this.operations()]);  // Add the new operation to the list
      alert('Operation saved successfully!');
    } catch (e) {
      alert('Error saving operation: ' + e);
    }
  }
}
