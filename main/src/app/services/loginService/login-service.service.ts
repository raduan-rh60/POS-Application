import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  baseUrl: string = "http://localhost:8080/api/user/login";

  constructor(private http: HttpClient) {  }

  loginDataToken(id:number):any {

  }
}
