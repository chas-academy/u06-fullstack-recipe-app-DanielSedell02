import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from '../interfaces/login-details';
import { Observable, Subject, catchError, throwError } from 'rxjs';




interface ResultData {
  token: string
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new Subject<boolean>();
  loggedIn$ = this.loggedIn.asObservable();

  private baseUrl = 'https://u06-fullstack-recipe-app-danielsedell02.onrender.com/api/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  

  constructor(private http:HttpClient) { }

  private updateLoginState(loginState: boolean) {
    this.loggedIn.next(loginState);
  }


  
//Gamla 
  // loginUser(loginDetails: LoginDetails){
  //   this.http.post<ResultData>(this.baseUrl+'login', loginDetails, this.httpOptions).pipe(
  //     catchError(this.handleError)).subscribe(result => {
  //       console.log(result);
  //       this.updateLoginState(true);
  //       this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer " + result.token);
  //     })
  // }

  // logoutuser(){
  //   this.http.post<ResultData>(this.baseUrl+'logout', {}, this.httpOptions).pipe(
  //     catchError(this.handleError)).subscribe(result => {
  //       console.log(result);
  //       this.updateLoginState(false);
  //       this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer ");
  //     })
  // }


//Register 

registerUser(form: any) {
  this.http.post<any>(this.baseUrl + 'register', form, this.httpOptions).pipe(
    catchError(this.handleError)
  ).subscribe(res => {
    console.log(res);
    console.log(res.token);
    localStorage.setItem("token", res.token);
  });
    
  }

  // Login User
  loginUser(loginDetails: Partial<LoginDetails>){
    this.http.post<any>(this.baseUrl+'login', loginDetails, this.httpOptions).pipe(
      catchError(this.handleError)).subscribe(result => {
        console.log(result);
        console.log(result.token);
        localStorage.setItem("token", result.token);
        this.updateLoginState(true);
        
      })
    
  }
  //  Logout User

logOut() {
  console.log(localStorage.getItem("token"))
  const token = localStorage.getItem("token") || '';
  this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer " + token);
  this.http.post<any>(this.baseUrl + 'logout', {}, this.httpOptions).pipe(
    catchError(this.handleError)
  ).subscribe(res => {
    console.log(res);
    console.log(res.token);
    this.updateLoginState(false);
  })

}

  private handleError(error: HttpErrorResponse){
    if (error.status === 404) {
     
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}