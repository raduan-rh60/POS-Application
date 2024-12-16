import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../../../product-info/product-lists/lists.component";
import {Observable} from "rxjs";
import {CartModel, OrderModel} from "../generate-sale.component";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  baseUrl:string = "http://localhost:8080/api/sale";

  public saveOrder(order:OrderModel) {
    return this.http.post(`${this.baseUrl}/save`, order);
  }
}
