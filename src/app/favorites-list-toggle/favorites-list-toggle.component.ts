/**
 * @module
 * Favorites List Toggle Component
 */
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// Services
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserDataStoreService } from '../user-data-store.service';

@Component({
  selector: 'app-favorites-list-toggle',
  templateUrl: './favorites-list-toggle.component.html',
  styleUrls: ['./favorites-list-toggle.component.scss']
})

/**
 * Renders a small star both indicating whether or not the breed is in the users favorites list and allows the user to add or remove the breed from their favorites list.
 */
export class FavoritesListToggleComponent implements OnInit {

  /**
   * ID of the breed in parent component
   */
  @Input() breedId: string;
  /**
   * Breed name of the breed in parent component
   */
  @Input() breedName: string;

  /** 
   * Array of IDs from breeds in users favorite breeds list. Populated by subscription to {@link UserDataStoreService.userFavorites}. 
   */
  userFavoriteBreedsIdsArray: any[] = [];

  _subscription_UserFavoriteBreeds;

  constructor(
    private fetchApiData: FetchApiDataService,
    private userDataStore: UserDataStoreService,
    private snackBar: MatSnackBar
  ) {
    this._subscription_UserFavoriteBreeds = this.userDataStore.userFavorites.subscribe(data => {
      this.userFavoriteBreedsIdsArray = data.map((obj: any) => obj._id);
    });
  }

  ngOnInit(): void {
  }

  /**
   * Sends request to add the breed to the users favorites list.
   * @param breedId ID of the breed to be added to users favorites list
   * @param breedName name of the breed to be added to users favorites list
   */
  addBreedToUserFavorites(breedId: string, breedName: string): void {
    this.fetchApiData.addToUserFavorites(breedId).subscribe({
      next: response => {
        this.userDataStore.updateUserFavorites(response);
        this.snackBar.open(`${breedName} has been added to your favorites`, 'OK', {
          duration: 2000
        });
      }, error: response => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000
        })
      }
    });
  }

  /**
   * Sends request to remove the breed from the users favorites list.
   * @param breedId ID of the breed to be removed from users favorites list
   * @param breedName name of the breed to be removed from the users favorites list
   */
  removeBreedFromUserFavorites(breedId: string, breedName: string): void {
    this.fetchApiData.removeFromUserFavorites(breedId).subscribe({
      next: response => {
        this.userDataStore.updateUserFavorites(response);
        this.snackBar.open(`${breedName} has been removed from your favorites`, 'OK', {
          duration: 2000
        });
      }, error: response => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000
        })
      }
    });
  }
}
