import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Purchase {
  id?: number;
  name: string;
  quantity: number;
  rate: number;
  sub_total?: number;
  date:Date;  // This is calculated on the backend, no need to send it in POST or PUT
}

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private apiUrl = "http://localhost:8080/api/purchases"; // Base URL for your API

  constructor(private http: HttpClient) {}

  // Fetch all purchases
  getAllPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(this.apiUrl);
  }

  // Fetch a purchase by ID
  getPurchaseById(id: number): Observable<Purchase> {
    return this.http.get<Purchase>(`${this.apiUrl}/${id}`);
  }

  // Create or update a purchase
  savePurchase(purchase: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(this.apiUrl, purchase);
  }

  // Update an existing purchase
  updatePurchase(id: number, purchase: Purchase): Observable<Purchase> {
    return this.http.put<Purchase>(`${this.apiUrl}/${id}`, purchase);
  }

  // Delete a purchase by ID
  deletePurchase(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // getting year and month groupby Data
  getYearMonthData():Observable<any[]>{
    return this.http.get<any>(`${this.apiUrl}/year-month`)
  }
}
