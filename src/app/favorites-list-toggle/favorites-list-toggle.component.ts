import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Services
 */
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserDataStoreService } from '../user-data-store.service';

@Component({
  selector: 'app-favorites-list-toggle',
  templateUrl: './favorites-list-toggle.component.html',
  styleUrls: ['./favorites-list-toggle.component.scss']
})
export class FavoritesListToggleComponent implements OnInit {

  @Input() breedId: string;
  @Input() breedName: string;

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
   * 
   * @param breedId 
   * @param breedName 
   * 
   * Sends Post request to API with breed ID as URL parameter to add the breed to the users favorites list.
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
   * 
   * @param breedId 
   * @param breedName 
   * 
   * Send Delete request to API with breed ID as URL parameter to remove the breed from the users favorites list.
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
