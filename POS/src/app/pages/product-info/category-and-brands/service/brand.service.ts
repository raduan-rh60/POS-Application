import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandModel } from '../category-and-brands.component';

@Injectable({
  providedIn: 'root'
})
export class BrandService {


  constructor(private https:HttpClient) { }

  baseUrl:string = "http://localhost:8080/api/brand"

  public getAllBrand():Observable<BrandModel[]>{
    return this.https.get<BrandModel[]>(this.baseUrl);
  }

  public createBrand(brand:BrandModel[]){
    return this.https.post(`${this.baseUrl}/save`,brand);
  }

  public updateBrand(brand:BrandModel[]){
    return this.https.put(`${this.baseUrl}/edit`,brand);
  }

  public delete(id:number){
    return this.https.delete(`${this.baseUrl}/${id}`,{responseType: 'text'});
  }
}
