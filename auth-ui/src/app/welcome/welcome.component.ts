import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  readonly API_URL = 'http://localhost:5000';
  public welcomeData: string;
  constructor(private http: HttpClient, private router: Router) { 
  }

  ngOnInit(): void {
    this.http.get(this.API_URL + `/welcome`).subscribe((data: any) => {
      console.log(data);
      this.welcomeData = data.message;
    });
  }
  welcome() {
    let url = `welcome`
    this.router.navigateByUrl(url);
  }
}
