/**
 * @module
 * Main App Component 
 */

import { Component, OnInit } from '@angular/core';

import { FetchApiDataService } from './fetch-api-data.service';
import { UserDataStoreService } from './user-data-store.service';

import { tUserData } from './user-profile/user-profile.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

/**
 * Main app component class
 */
export class AppComponent {
  /**
   * App title
   */
  title = 'chickenPicker-Angular-client';

  public isUserLoggedIn: boolean;

  constructor(
    private fetchApiData: FetchApiDataService,
    private userDataStore: UserDataStoreService,
  ) {}

  ngOnInit(): void {
    this.checkLocalStorageForUser();
  }

  /**
   * Checks localStorage for user data. 
   * If found, {@link UserDataStoreService.updateUserData | update the user data store}, 
   * {@link FetchApiDataService.getUserFavorites | fetch the users favorites}, and 
   * {@link UserDataStoreService.updateUserFavorites | update the user favorites store}. 
   * Otherwise, {@link FetchApiDataService.userLogout | logout}.
   */
  private checkLocalStorageForUser(): void {
    if(localStorage.getItem('username')) {
      let userData: tUserData = {
        username: localStorage.getItem('username') || '',
        email: localStorage.getItem('email') || '',
        birthday: localStorage.getItem('birthday') || '',
      }
      this.userDataStore.updateUserData(userData);

      this.fetchApiData.getUserFavorites().subscribe({
        next: response => {
          this.userDataStore.updateUserFavorites(response);
        }, error: response => {
          console.error(response);
        }
      });
    } else {
      this.fetchApiData.userLogout();
    }
  }
}
