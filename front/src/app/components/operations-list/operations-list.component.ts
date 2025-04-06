import { Component, OnInit, signal } from '@angular/core';
import { NgIf, NgFor } from '@angular/common'; // ✅ Added
import { BankOperationsService } from '../../services/bank-operations.service';
import { BankOperation } from '../../models/bankOperations/bank-operation.model';

@Component({
  selector: 'app-operations-list',
  templateUrl: './operations-list.component.html',
  styleUrls: ['./operations-list.component.css'],
  imports: [NgIf, NgFor] // ✅ Added
})
export class OperationsListComponent implements OnInit {
  operations = signal<BankOperation[]>([])

  constructor(
    public bankOperationsService: BankOperationsService
  ) {}

  ngOnInit(): void {
    this.fetchOperations()
  }

  async fetchOperations(): Promise<void> {
    try {
      const accountNumber = '12345';
      const data = await this.bankOperationsService.getOperations(accountNumber);
      this.operations.set(data);
    } catch (e) {
      alert('Error fetching operations: ' + e);
    }
  }

  addOperation(newOperation: BankOperation): void {
    this.operations.set([newOperation, ...this.operations()]);
  }

  // ✅ Add this function:
  trackByOperationId(index: number, operation: BankOperation): any {
    return index;
  }
}