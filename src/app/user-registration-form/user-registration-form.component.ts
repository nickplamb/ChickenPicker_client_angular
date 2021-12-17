/**
 * @module
 * User Registration Component
 */
import { Component, OnInit, Input } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service'; 

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

/** 
 * UserRegistrationFormComponent is rendered in a dialog from the {@link WelcomePageComponent | WelcomePageComponent} 
 */
export class UserRegistrationFormComponent implements OnInit {
  /**
   * User inputs from form in template
   */
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  /**
   * Calls the {@link FetchApiDataService.userRegistration | user registration} method and passes new user data to it.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({next: result => {
      this.dialogRef.close(); // this closes the modal on success
      this.snackBar.open('Thanks for signing up! Login to continue.', 'OK', {
        duration: 2000
      });
    }, error: result => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    }});
  }
}
