import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginDetails } from '../../interfaces/login-details';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule] ,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  

loginDetails: LoginDetails;



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
Submit() {
  
  // Handle form submission logic here
  console.log(this.loginDetails) //to see if it works
  this.auth.loginUser(this.loginDetails)
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
