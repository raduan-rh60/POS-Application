import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../../../product-info/product-lists/lists.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PosServiceService {

  constructor(private http: HttpClient) {  }
  baseUrl:string="http://localhost:8080/api/product"

  public getProductByID(id:number){
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }
  public getProductByName(name:string):Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}/pos?name=${name}`);
  }
  public getProductByCategory(CategoryId:number):Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}/pos/category?id=${CategoryId}`);
  }



}
