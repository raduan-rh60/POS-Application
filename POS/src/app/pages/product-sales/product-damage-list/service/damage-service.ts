import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DamageDTO {
  id?: number;
  productId: number;
  productName: string;
  reason: string;
  quantity: number;
  productPrice: number;
  damageAmount: number;
  date: Date;  
}

@Injectable({
  providedIn: 'root'
})
export class DamageService {
  private apiUrl = "http://localhost:8080/api/damages"; // Use your API URL from environment.ts

  constructor(private http: HttpClient) {}

  // Create or Update Damage record
  createDamage(damageDTO: DamageDTO): Observable<DamageDTO> {
    return this.http.post<DamageDTO>(`${this.apiUrl}/createOrUpdate`, damageDTO, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Get the list of all Damage records
  getDamageList(): Observable<DamageDTO[]> {
    return this.http.get<DamageDTO[]>(`${this.apiUrl}`);
  }

  // Delete a Damage record by ID
  deleteDamage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}

