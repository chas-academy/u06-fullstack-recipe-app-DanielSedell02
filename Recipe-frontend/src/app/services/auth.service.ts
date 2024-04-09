import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from '../interfaces/login-details';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { User } from '../interfaces/user';



interface ResultData {
  token: string
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new Subject<boolean>();
  loggedIn$ = this.loggedIn.asObservable();

  private baseUrl = 'http://127.0.0.1:8000/api/';

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

  logOut(){
    this.http.post<ResultData>(this.baseUrl+'logout', {}, this.httpOptions).pipe(
      catchError(this.handleError)).subscribe(result => {
        console.log(result);
        this.updateLoginState(false);
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer ");
      })
  }


//Register 

registerUser(form: any) {
  this.http.post<any>(this.baseUrl + 'register', form, this.httpOptions).pipe(
    catchError(this.handleError)
  ).subscribe(res => {
    console.log(res);
    console.log(res.token);
    localStorage.setItem("token", res.token);
  });
    
   // console.log("test");
    //console.log(form);
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

logoutUser() {
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

  getUser2(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl+'getuser/2', this.httpOptions);
  }

  private handleError(error: HttpErrorResponse){
    if (error.status === 404) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}