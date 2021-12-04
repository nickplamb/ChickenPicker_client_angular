import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FetchApiDataService } from 'src/app/fetch-api-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router,
    public fetchApiData: FetchApiDataService
  ) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.fetchApiData.userLogout();
  }

  public goToProfile(): void {
    this.router.navigate(['profile']);
  }

  public goHome():void {
    this.router.navigate(['breeds']);
  }

}
