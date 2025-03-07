import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CartModel} from "../pos.component";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  baseUrl:string = "http://localhost:8080/api/cart";

  public getAllCart():Observable<CartModel[]> {
    return this.http.get<CartModel[]>(`${this.baseUrl}`);
  }

  public addCart(cart:CartModel):Observable<CartModel> {
    return this.http.post<CartModel>(`${this.baseUrl}`,cart);
  }

  public editCart(cart:CartModel):Observable<CartModel> {
    return this.http.put<CartModel>(`${this.baseUrl}/edit`,cart);
  }

  public deleteCartItem(id:number){
    return this.http.delete(`${this.baseUrl}/${id}`,{responseType:"text"});
  }

  public clearCart(){
    return this.http.delete(`${this.baseUrl}/clear`);
  }
  public updateStatus(status:string){
    return this.http.patch(`${this.baseUrl}/status?cartStatus=${status}`,{},{responseType:"text"});
  }

  public newAddToCart(productId:number):Observable<CartModel> {
    return this.http.post<CartModel>(`${this.baseUrl}/new?productId=${productId}`,{});
  }
}
