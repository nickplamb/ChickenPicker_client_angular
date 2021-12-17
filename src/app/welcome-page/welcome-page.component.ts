/**
 * @module 
 * Welcome Page Component
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})

/**
 * WelcomePageComponent is rendered on the home page and allows users to login or register.
 */
export class WelcomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
   * User selected Register. Opens dialog for user registration.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '450px'
    });
  }

  /**
   * User selected Login. Opens dialog for user login.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '450px'
    });
  }

}
