import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReturnData} from "../return-form.component";

@Injectable({
  providedIn: 'root'
})
export class ReturnService {

  constructor(private http: HttpClient) { }
  baseUrl:string = "http://localhost:8080/api/return";

  public getReturn():Observable<ReturnData[]> {
  return this.http.get<ReturnData[]>(`${this.baseUrl}`);
  }

  public saveReturn(returnProduct:ReturnData){
    return this.http.post<ReturnData>(`${this.baseUrl}`, returnProduct);
  }
}
