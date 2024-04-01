import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  
  private baseUrl = 'https://api.edamam.com/api/recipes/v2';
  private app_key = '%2058729537df2701ee3251ea2396929900';
  private app_id = '09262acf';

  private httpOptions = {
    headers: new HttpHeaders({
      'accept':'application/json',
      'Accept-Language':'en'
    })
  }

  constructor(private http:HttpClient) { }

  getRecipes(searchterm = "Chicken", quisineType="British", mealType="Dinner"): Observable<any> {
    let url = this.baseUrl + "?type=public" + "&q=" + searchterm + "&app_id=" + this.app_id + "&app_key=" + this.app_key + "&cuisine_type=" + quisineType + "&mealType=" + mealType;
    return this.http.get<any>(url, this.httpOptions);
  }

  getRecipe(id: string){
    let url = this.baseUrl + "/" + id + "?type=public" + "&app_id=" + this.app_id + "&app_key=" + this.app_key;
    return this.http.get<any>(url, this.httpOptions);


  }

}

