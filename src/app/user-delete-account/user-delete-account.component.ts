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
export class UserDeleteAccountComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<UserDeleteAccountComponent>,
    private snackBar: MatSnackBar,
    private fetchApiData: FetchApiDataService,
  ) { }

  ngOnInit(): void {
  }

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
