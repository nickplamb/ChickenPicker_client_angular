/**
 * @module
 * User Login Form Component
 */
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';
import { UserDataStoreService } from '../user-data-store.service';

import { tUserData } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  /**
   * Inputs from login form
   */
  @Input() userCredentials = { email: '', password: '' };

  constructor(
    private fetchApiData: FetchApiDataService,
    private userDataStore: UserDataStoreService,
    private dialogRef: MatDialogRef<UserLoginFormComponent>,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Sends login credentials to API.
   * Uses response to update items in localStorage and update {@link UserDataStoreService.userData}, then navigates to /breeds.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe({ 
      next: response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('email', response.user.email);
        localStorage.setItem('username', response.user.username);
        localStorage.setItem('birthday', response.user.birthday);

        this.userDataStore.updateUserData(response.user);

        this.dialogRef.close();
        this.router.navigate(['breeds']);
        this.snackBar.open('Login Successful', 'OK', {
          duration: 2000
        });
      }, error: response => {
        this.snackBar.open('Something went wrong, please try again.', 'OK', {
          duration: 2000
        });
      }
    });
  }

}
