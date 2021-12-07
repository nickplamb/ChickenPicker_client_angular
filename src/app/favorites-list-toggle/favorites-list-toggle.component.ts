import { Component, Input, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';
import { UserDataStoreService } from '../user-data-store.service';

@Component({
  selector: 'app-favorites-list-toggle',
  templateUrl: './favorites-list-toggle.component.html',
  styleUrls: ['./favorites-list-toggle.component.scss']
})
export class FavoritesListToggleComponent implements OnInit {

  @Input() breed: Object;
  @Input() isAFavorite: boolean;

  constructor(
    private fetchApiData: FetchApiDataService,
    private userDataStore: UserDataStoreService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  addBreedToUserFavorites(breed: any): void {
    console.log(breed)
    this.fetchApiData.addToUserFavorites(breed._id).subscribe({
      next: response => {
        this.userDataStore.updateUserFavorites(response);
        this.snackBar.open(`${breed.breed} has been added to your favorites`, 'OK', {
          duration: 2000
        });
      }, error: response => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000
        })
      }
    })
  }

  removeBreedFromUserFavorites(breed: any): void {
    this.fetchApiData.removeFromUserFavorites(breed._id).subscribe({
        next: response => {
          this.userDataStore.updateUserFavorites(response);
          this.snackBar.open(`${breed.breed} has been removed from your favorites`, 'OK', {
            duration: 2000
          });
        }, error: response => {
          console.log(response);
          this.snackBar.open(response, 'OK', {
            duration: 2000
          })
        }
      })
  }

}
