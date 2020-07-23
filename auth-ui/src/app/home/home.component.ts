import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  readonly API_URL = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  signIn() {
    this.http.get(this.API_URL + '/signin')
    .subscribe((res) => {
      console.log(res);
      if(res['token']) {
        localStorage.setItem('token', res['token']);
      }
    }, (err) => {
      console.log(err);
    });
  }

  login() {
    this.http.post(this.API_URL +'/login', {"username":"user1","password":"password1"}).subscribe((res) => {
      console.log(res);
      if(res) {
        localStorage.setItem('token', res as string);
      }
    }, (err) => {
      console.log(err);
    });
  }


  getPath() {
    this.http.get(this.API_URL + '/welcome')
    .subscribe((res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    });
  }

}
