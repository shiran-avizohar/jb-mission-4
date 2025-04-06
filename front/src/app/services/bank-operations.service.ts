import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface BankOperation {
  accountNumber: string;
  type: 'deposit' | 'withdrawal' | 'loan';
  amount: number;
  date: string;
  interest?: number;
  payments?: number;
}

@Injectable({
  providedIn: 'root'
})
export class BankOperationsService {

  public apiUrl = 'http://localhost:3001/operations';

  constructor(public http: HttpClient) { }

  async getOperations(accountNumber: string): Promise<BankOperation[]> {
    const observable = this.http.get<BankOperation[]>(`${this.apiUrl}/${accountNumber}`);
    return await firstValueFrom(observable);
  }

  async addOperation(operation: BankOperation): Promise<BankOperation> {
    const observable = this.http.post<BankOperation>(this.apiUrl, operation);
    return await firstValueFrom(observable);
  }
}
