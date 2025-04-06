// src/app/services/bank-operations.service.ts

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
  providedIn: 'root' // השירות יהיה זמין לכל האפליקציה
})
export class BankOperationsService {

  public apiUrl = 'http://localhost:3001/operations'; // כתובת ה-API שלך

  constructor(public http: HttpClient) { }

  // פונקציה שמביאה את הפעולות לפי מספר חשבון
  async getOperations(accountNumber: string): Promise<BankOperation[]> {
    const observable = this.http.get<BankOperation[]>(`${this.apiUrl}/${accountNumber}`);
    return await firstValueFrom(observable);
  }

  // פונקציה להוספת פעולה חדשה לחשבון
  async addOperation(operation: BankOperation): Promise<BankOperation> {
    const observable = this.http.post<BankOperation>(this.apiUrl, operation);
    return await firstValueFrom(observable);
  }
}
