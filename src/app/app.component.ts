import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
// import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { BreedCardComponent } from './breed-card/breed-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chickenPicker-Angular-client';

  constructor(public dialog: MatDialog) {}

  // openUserRegistrationDialog(): void {
  //   this.dialog.open(UserRegistrationFormComponent, {
  //     width: '280px'
  //   });
  // }

  // openUserLoginDialog(): void {
  //   this.dialog.open(UserLoginFormComponent, {
  //     width: '280px'
  //   });
  // }

  openBreedsDialog(): void {
    this.dialog.open(BreedCardComponent, {
      width: '500px'
    });
  }
}
