// src/app/components/operations-list/operations-list.component.ts

import { Component, OnInit, signal } from '@angular/core';
import { BankOperationsService } from '../../services/bank-operations.service'; // Import service
import { BankOperation } from '../../models/bankOperations/bank-operation.model';

@Component({
  selector: 'app-operations-list',
  templateUrl: './operations-list.component.html',
  styleUrls: ['./operations-list.component.css']
})
export class OperationsListComponent implements OnInit {
  operations = signal<BankOperation[]>([])  // Signal to store the list of operations

  constructor(
    public bankOperationsService: BankOperationsService
  ) {}

  ngOnInit(): void {
    this.fetchOperations()
  }

  // Fetch the operations by account number
  async fetchOperations(): Promise<void> {
    try {
      const accountNumber = '12345'; // Example account number, you can replace this with dynamic input
      const data = await this.bankOperationsService.getOperations(accountNumber);
      this.operations.set(data);  // Update signal with the fetched data
    } catch (e) {
      alert('Error fetching operations: ' + e);
    }
  }

  // Add a new operation to the list
  addOperation(newOperation: BankOperation): void {
    this.operations.set([newOperation, ...this.operations()]);  // Add the new operation to the front
  }
}
