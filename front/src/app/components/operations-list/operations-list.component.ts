import { Component } from '@angular/core';

@Component({
  selector: 'app-operations-list',
  templateUrl: './operations-list.component.html',
  styleUrls: ['./operations-list.component.css']
})
export class OperationsListComponent {
  accountNumber: string = '';  // To store the entered bank account number
  operations: any[] = [];  // To store the operations fetched for the account

  // Function to fetch operations for the entered account number
  getOperations() {
    if (this.accountNumber) {
      // Simulating an API call by hardcoding data based on account number
      if (this.accountNumber === '123456') {
        this.operations = [
          { type: 'Deposit', amount: 1000, date: '2023-04-06' },
          { type: 'Withdrawal', amount: 200, date: '2023-04-05' }
        ];
      } else {
        this.operations = [];  // No operations if the account number doesn't match
      }
    } else {
      alert('Please enter a bank account number');  // Alert if no account number is entered
    }
  }
}
