import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatDivider } from '@angular/material/divider';

import { FetchApiDataService } from '../fetch-api-data.service';
import { BreedDescriptionService } from '../breed-description.service';
import { UserDataStoreService } from '../user-data-store.service';

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
    private breedDescriptionService: BreedDescriptionService,
    private userDataStore: UserDataStoreService,
    private router: Router,
    private snackbar: MatSnackBar,
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
    console.log('user data to update');
    console.log(this.userDataToUpdate);
    this.fetchApiData.updateUserInfo(this.userDataToUpdate).subscribe({
      next: response => {
        console.log(response)
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
}
