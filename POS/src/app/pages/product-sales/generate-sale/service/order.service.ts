import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../../../product-info/product-lists/lists.component";
import {Observable} from "rxjs";
import {CartModel, OrderModel} from "../pos.component";
import {OrderData} from "../../order-details/order-details.component";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  baseUrl:string = "http://localhost:8080/api/sale";

  public saveOrder(order:OrderModel):Observable<OrderModel> {
    return this.http.post<OrderModel>(`${this.baseUrl}/save`, order);
  }
  public findOrderById(id: string | null):Observable<OrderData> {
    return this.http.get<OrderData>(`${this.baseUrl}/${id}`);
  }
  public findallSales():Observable<OrderData[]>{
    return this.http.get<OrderData[]>(`${this.baseUrl}`);
  }
  public findGeneralSales():Observable<OrderData[]>{
    return this.http.get<OrderData[]>(`${this.baseUrl}/order-type?orderType=GENERAL`);
  }
  public findOnlineSales():Observable<OrderData[]>{
    return this.http.get<OrderData[]>(`${this.baseUrl}/order-type?orderType=ONLINE`);
  }
  public deleteSale(id:number){
    return this.http.delete(`${this.baseUrl}/${id}`,{responseType:"text"});
  }
}
