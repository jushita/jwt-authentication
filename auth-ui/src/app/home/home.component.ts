import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { WelcomeComponent } from '../welcome/welcome.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  readonly API_URL = 'http://localhost:5000';

  public welcomeMessage;
  public notAuthorized: string
  constructor(private http: HttpClient, private router: Router, public welcomeComponent: WelcomeComponent) { 
  }

  ngOnInit(): void {
  }

  login(name: string, password: string) {
    this.http.post(this.API_URL +'/login', {"name":name,"password":password})
      .subscribe({
        next: (res: any) => {
          if(res) {
            localStorage.setItem('token', res.token as string);
            this.welcomeComponent.welcome();        
          }
        },
        error: (err) => {
          console.log(err);
          this.notAuthorized = "You're not authorized"
        }
      });
      
  }

  

}
