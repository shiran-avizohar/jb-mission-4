import { Component, OnInit, signal } from '@angular/core';
import { BankOperationsService } from '../../services/bank-operations.service';

@Component({
  selector: 'app-new-operation',
  templateUrl: './new-operation.component.html',
  styleUrls: ['./new-operation.component.css']
})
export class NewOperationComponent implements OnInit {
    // Signals to bind input fields
    accountNumber = signal('');
    operationType = signal<'deposit' | 'withdrawal' | 'loan'>('deposit');
    amount = signal<number | undefined>(undefined);
    interest = signal<number | undefined>(undefined);
    payments = signal<number | undefined>(undefined);

    constructor(public bankOperationsService: BankOperationsService) {}

    ngOnInit(): void {}

    // Method to save the operation
    async saveOperation() {
        const currentDate = new Date().toISOString();  // Current date as ISO string

        // Prepare the operation data object
        const operationData = {
            accountNumber: this.accountNumber(),
            type: this.operationType(),
            amount: this.amount() ?? 0,
            interest: this.operationType() === 'loan' ? this.interest() ?? 0 : undefined,
            payments: this.operationType() === 'loan' ? this.payments() ?? 0 : undefined,
            date: currentDate
        };

        try {
            await this.bankOperationsService.addOperation(operationData);
            alert('Operation saved successfully!');
        } catch (e) {
            alert('Error saving the operation');
        }
    }
}
