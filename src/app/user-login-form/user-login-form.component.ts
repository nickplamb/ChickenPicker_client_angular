import { Component, OnInit, Input } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userCredentials = { email: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe({ next: result => {
      localStorage.setItem('token', result.token)
      localStorage.setItem('userEmail', result.user.email);
      localStorage.setItem('username', result.user.username);
      console.log(result)
      this.dialogRef.close();
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    }, error: result => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    }});
  }

}
