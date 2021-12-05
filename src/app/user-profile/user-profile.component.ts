import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';

import { FetchApiDataService } from '../fetch-api-data.service';
import { BreedDescriptionService } from '../breed-description.service';
import { UserDataStoreService } from '../user-data-store.service';

import { UserDeleteAccountComponent } from '../user-delete-account/user-delete-account.component';

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
export class UserProfileComponent implements OnInit {

  usersFavoriteBreeds: any[] = [];
  currentUserData: tUserData = { };
  _subscription_UserFavoriteBreeds;
  _subscription_UserData;

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

  public deleteUserAccount(): void {
    this.dialog.open(UserDeleteAccountComponent, {
      width: '500px'
    });
  }
}
