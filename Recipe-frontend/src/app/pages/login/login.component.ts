import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginDetails } from '../../interfaces/login-details';
import { User } from '../../interfaces/user';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule] ,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Import av interface

loginDetails: LoginDetails;

// FormGroup

loginForm = new FormGroup({
  email: new FormControl(''),
  password: new FormControl(''),
})



  constructor(private auth: AuthService) { 
    this.loginDetails = {
      email:"",
      password:"",
    }
  }

  login() {
    const loginDetails: Partial<LoginDetails> = {
        email: this.loginForm.value.email || '', 
        password: this.loginForm.value.password || '' 
    };
    this.auth.loginUser(loginDetails);
}

}











//   title = 'authapp';

//   loginDetails: LoginDetails;

//   user: User;

//   loggedIn$: Observable<boolean>;

//   constructor(private auth: AuthService){
//     this.loginDetails = {
//       email:"",
//       password:""
//     }

//     this.user = {
//       id:-1,
//       name:"",
//       email:""
//     }

//     this.loggedIn$ = this.auth.loggedIn$;
//   }

//   login(){
//     this.auth.loginUser(this.loginDetails);
//   }
//   logout(){
//     this.auth.logOut();
//   }

//   getUser(){
//     this.auth.getUser2().subscribe(res => {
//       console.log(res[0]);
//       this.user = res[0];
//       this.user.welcomeMessage = `Welcome ${this.user.name}`;
//     })
//   }
