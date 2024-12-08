import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel } from '../category-and-brands.component';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private https:HttpClient) { }

  baseUrl:string = "http://localhost:8080/api/category"

  public getAllCat():Observable<CategoryModel[]>{
    return this.https.get<CategoryModel[]>(this.baseUrl);
  }

  public createCat(cat:CategoryModel){
    return this.https.post(`${this.baseUrl}/save`,cat);
  }

  public updateCat(cat:CategoryModel){
    return this.https.put(`${this.baseUrl}/edit`,cat);
  }

  public delete(id:number){
    return this.https.delete(`${this.baseUrl}/${id}`);
  }
}
