/**
 * @module
 * Navbar Component
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FetchApiDataService } from 'src/app/fetch-api-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

/**
 * Navbar component is rendered on each page and contains standard navigation links.
 */
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router,
    public fetchApiData: FetchApiDataService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Logs the user out with {@link FetchApiDataService.userLogout}.
   */
  public logout(): void {
    this.fetchApiData.userLogout();
  }

  /**
   * Navigates to /profile
   */
  public goToProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Navigates to /breeds
   */
  public goHome():void {
    this.router.navigate(['breeds']);
  }

}
