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

  getRecipes(searchterm = "", diet: string, mealType: string): Observable<any> {
    let url = this.baseUrl + "?type=public" + "&q=" + searchterm + "&app_id=" + this.app_id + "&app_key=" + this.app_key  + "&mealType=" + mealType;
    //let url = this.baseUrl + "?type=public";
    if(searchterm){
      url += "&q=" + searchterm; 
    }
    if(searchterm){
      url += "&diet=" + diet; 
    }
    if(searchterm){
      url += "&mealType=" + mealType; 
    }
    // console.log(url);
    return this.http.get<any>(url, this.httpOptions);
  }

  getRecipe(id: string){
    let url = this.baseUrl + "/" + id + "?type=public" + "&app_id=" + this.app_id + "&app_key=" + this.app_key;
    return this.http.get<any>(url, this.httpOptions);


  }

}

