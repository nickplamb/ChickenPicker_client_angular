import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatDivider } from '@angular/material/divider';

import { FetchApiDataService } from '../fetch-api-data.service';
import { BreedDescriptionService } from '../breed-description.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  usersFavoriteBreeds: any[] = []

  constructor(
    public fetchApiData: FetchApiDataService,
    public breedDescriptionService: BreedDescriptionService,
    public snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData():void {
    this.fetchApiData.getUserFavorites().subscribe({
      next: response => {
        this.usersFavoriteBreeds = this.breedDescriptionService.addImageUrlToBreeds(response);
        console.log(response);
      }, error: response => {
        this.snackbar.open(response, 'OK', {
          duration: 2000
        });
      }
    })
  }

}
