/**
 * @module
 * User Delete Account Component
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-delete-account',
  templateUrl: './user-delete-account.component.html',
  styleUrls: ['./user-delete-account.component.scss']
})

/**
 * Component renders in a dialog from the {@link UserProfileComponent} to confirm that the user wants to delete their account.
 */
export class UserDeleteAccountComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<UserDeleteAccountComponent>,
    private snackBar: MatSnackBar,
    private fetchApiData: FetchApiDataService,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Sends request to API to delete account then logs the user out.
   */
  public deleteUserAccount(): void {
    this.fetchApiData.deleteUserAccount().subscribe({
      next: response => {
        this.fetchApiData.userLogout();
        this.dialogRef.close();
        this.snackBar.open('Your account was successfully deleted', 'OK', {
          duration: 3000
        });
      }, error: response => {
        console.log(response)
        this.snackBar.open('Something went wrong, please try again.', 'OK', {
          duration: 2000
        });
      }
    });
  }

}
