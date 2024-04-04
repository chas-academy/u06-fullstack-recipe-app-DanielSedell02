import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { RegisterDetails } from '../../interfaces/register-details';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
 
form = new FormGroup({
  name: new FormControl(''),
  email: new FormControl(''),
  password: new FormControl(''),
  password_confirmation: new FormControl('')
})

// Register 

registerDetails: RegisterDetails;

constructor(private auth: AuthService) {
  this.registerDetails = {
    name:"",
    email:"", 
    password:"", 
    password_confirmation:"",
    
  }

}
register(){
  this.auth.registerUser(this.form.value)
}


}



