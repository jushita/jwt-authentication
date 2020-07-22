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
    this.http.get(this.API_URL + 'token/sign')
    .subscribe((res) => {
      console.log(res);
      if(res['token']) {
        localStorage.setItem('token', res['token']);
      }
    }, (err) => {
      console.log(err);
    });
  }

  getPath() {
    this.http.get(this.API_URL + '/home')
    .subscribe((res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    });
  }

}
