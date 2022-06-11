// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { AuthService } from 'src/app/SERVICES/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   LoginForm: FormGroup | undefined;

//   constructor(private fb:FormBuilder, private auth: AuthService) {
//     this.createForm()
//    }

//   ngOnInit(): void {
    
//   }

//   createForm(){
//     this.LoginForm= this.fb.group({
//       email:[''],
//       password:['']
//     })
//   }
//   signin(){
//     this.auth.signIn(this.LoginForm?.value.email, this.LoginForm?.value.password )
//   }

//   createAccount(){
//     this.auth.signUp(this.LoginForm?.value.email, this.LoginForm?.value.password)
//   }

// }


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import * as crypto from 'crypto-js';
import { SharedService } from 'src/app/SERVICES/shared.service';

import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {
  LoginForm: FormGroup | undefined;

  constructor(private service:SharedService,private router: Router) { }

  ngOnInit(): void {
  }
  public userEmail: string="";
  public userPassword:string="";

  onSubmit()
  {
    const data=
      {
        "email":this.userEmail,
        "password": crypto.SHA256(this.userPassword).toString(),
      }
      

      
       
        this.service.validateUser(data).subscribe((res) => {
          console.log("all data from validation user")
          console.log(this.service.get());
          if(res)
         this.router.navigate(['/homepage'])
          else
          alert("Incorrect Username or Password");
        });
        
      } 
    }