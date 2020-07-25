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

  login() {
    console.log(this.API_URL + '/login')
    this.http.post(this.API_URL +'/login', {"name":"name1","password":"password1"})
      .subscribe({
        next: (res) => {
          console.log(res);
          if(res) {
            localStorage.setItem('token', res.token as string);
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  welcome() {
    this.http.get(this.API_URL + `/welcome`).subscribe((data) => {
      console.log(data);
    });
  }

}
