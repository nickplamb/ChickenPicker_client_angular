/**
 * @module
 * User Profile Component
 */
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';

import { FetchApiDataService } from '../fetch-api-data.service';
import { BreedDescriptionService } from '../breed-description.service';
import { UserDataStoreService } from '../user-data-store.service';

import { UserDeleteAccountComponent } from '../user-delete-account/user-delete-account.component';

/**
 * @typedef tUserData - User data interface
 */
export interface tUserData {
  [index: string]: any;
  username?: string;
  email?: string;
  birthday?: string; //Date;
  password?: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

/**
 * UserProfileComponent holds the user update form and list of users favorite breeds displayed using {@link BreedCardComponent}.
 */
export class UserProfileComponent implements OnInit {

  /** 
   * Array of breed objects in users favorite breeds list. Populated by subscription to {@link UserDataStoreService.userFavorites}. 
   */
  usersFavoriteBreeds: any[] = [];
  /** 
   * User data object. Populated by subscription to {@link UserDataStoreService.userData}. 
   */
  currentUserData: tUserData = { };
  _subscription_UserFavoriteBreeds;
  _subscription_UserData;

  /**
   * Input from form in template
   */
  @Input() userDataToUpdate: tUserData = { }

  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;

  constructor(
    private fetchApiData: FetchApiDataService,
    private userDataStore: UserDataStoreService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this._subscription_UserFavoriteBreeds = this.userDataStore.userFavorites.subscribe(data => {
      this.usersFavoriteBreeds = data;
    });
    this._subscription_UserData = this.userDataStore.userData.subscribe(data => {
      this.currentUserData = data;
    })
   }

  ngOnInit(): void {
  }

  /**
   * Sends new user data to API. 
   * Uses response to update user data in local storage, update {@link UserDataStoreService.userData} and resets form input.
   */
  public updateUserProfile(): void {
    this.fetchApiData.updateUserInfo(this.userDataToUpdate).subscribe({
      next: response => {
        localStorage.setItem('email', response.email);
        localStorage.setItem('username', response.username);
        localStorage.setItem('birthday', response.birthday);

        this.userDataStore.updateUserData(response);
        this.userDataToUpdate = {};
        this.ngOnInit(); // refreshes the component

        this.snackbar.open('Profile Successfully Updated', 'ok', {
          duration: 2000
        });
      }, error: response => {
        console.log(response)
        this.snackbar.open('Something went wrong, please try again.', 'ok', {
          duration: 2000
        });
      }
    });
  }

  /**
   * Opens dialog with {@link UserDeleteAccountComponent} to confirm deleting the users account.
   */
  public deleteUserAccount(): void {
    this.dialog.open(UserDeleteAccountComponent, {
      width: '500px'
    });
  }
}
