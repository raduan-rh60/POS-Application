import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../lists.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  baseUrl:string = "http://localhost:8080/api/product"

  public saveProduct(product:Product){
   return this.http.post(`${this.baseUrl}/save`,product);
  }

  public getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl);
  }

  public deleteProduct(id:number){
    return this.http.delete(`${this.baseUrl}/delete/${id}`,{responseType:"text"});
  }

  public updateService(product:Product){
    return this.http.put(`${this.baseUrl}/edit/${product.id}`,product);
  }

  // pos service ==================

  public getPosProductsByCategory(id:number):Observable<Product[]>{

    return this.http.get<Product[]>(`${this.baseUrl}/pos/category?id=${id}`);
  }

  public getPosProductsByName(name:string):Observable<Product>{

    return this.http.get<Product>(`${this.baseUrl}/pos`);
  }

  public getProductById(id:number):Observable<Product>{
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }
  public updateStock(id:number, stock:number){
    return this.http.patch(`${this.baseUrl}/update-stock/${id}?stock=${stock}`, {},{responseType:"text"});


  }
}
