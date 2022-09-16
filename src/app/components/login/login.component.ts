
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  goBack() {
    
    this.location.back();
  }

  constructor(
    private authService:AuthService
    ,private router:Router,
    private state:StateService
    ,private request:RequestService
    ,private location: Location
    ) { }

  ngOnInit(): void {
  }
  async loginWithGoogle(){
    const response = await this.authService.loginWithGoogle() 
    console.log(response)

if(response){
  this.state.state.next({
    logedIn:true,
    authenticatedPerson: response,
    token: ''
  });
  this.router.navigateByUrl('/main')
  this.request
  .loginMethod({
    username: response.user.email,
   password: response.user.email

  }).subscribe({
    next:(token :any) =>{
      if(token ){
        this.state.state.next({
          logedIn: true,
          authenticatedPerson: response,
          token: token.access_token
        })
        
      }
      this.router.navigateByUrl('/main')
    }
  })
  
}



    // if(response){
    //   this.request.loginMethod({
    //     username: response.user.email,
    //     password: response.user.email
    //   }).subscribe(token =>{
    //     console.log(token)
    //     this.state.state.next({
    //       logedIn:true,
    //       authenticatedPerson:response
    //       ,token: token
    //     })
    //   })
      
    //   this.router.navigateByUrl('/main')
    // }
    // console.log(response)
  
  }
}
// if(response){
    //   this.state.state.next({
    //     logedIn:true,
    //     authenticatedPerson:response,
    //     token : ""

    //   })
    //   this.request.loginMethod({
    //     username: response.user.email,
    //     password: response.user.email

    //   }).subscribe({
    //     next: token =>{
    //       if(token){
    //         this.state.state.next({
    //           logedIn: true ,
    //           authenticatedPerson :response,
    //           token : token
    //         })
    //       }
    //       this.router.navigateByUrl('/main')
    //     }
    //   })
    // }
