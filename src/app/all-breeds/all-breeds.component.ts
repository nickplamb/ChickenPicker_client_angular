/**
 * @module
 * All Breeds Component
 */
import { Component, OnInit } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';
import { BreedDescriptionService } from '../breed-description.service';
import { UserDataStoreService } from '../user-data-store.service';

@Component({
  selector: 'app-all-breeds',
  templateUrl: './all-breeds.component.html',
  styleUrls: ['./all-breeds.component.scss']
})

/**
 * Gets all breeds and user favorites array. Updates {@link UserDataStoreService.userFavorites} and renders {@link BreedCardComponent}
 */
export class AllBreedsComponent implements OnInit {

  /**
   * Array of breed objects to be passed to {@link BreedCardComponent}. Set in {@link AllBreedsComponent.ngOnInit | ngOnInit} method.
   */
  breeds: any[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    private breedDescriptionService: BreedDescriptionService,
    private userDataStore: UserDataStoreService,
  ) { }

  ngOnInit(): void {
    this.getAllBreeds();
    this.getUserFavorites();
  }

  /**
   * Requests all breeds from API, {@link breedDescriptionService.addImageUrlToBreeds | add an imgUrl property}.
   */
  private getAllBreeds(): void {
    this.fetchApiData.getAllBreeds().subscribe((response: any) => {
      this.breeds = this.breedDescriptionService.addImageUrlToBreeds(response);
    });
  }

  /**
   * Request users favorites list and updates {@link UserDataStoreService.userFavorites}.
   */
  private getUserFavorites():void {
    this.fetchApiData.getUserFavorites().subscribe({
      next: response => {
        this.userDataStore.updateUserFavorites(response);
      }, error: response => {
        console.error(response);
      }
    });
  }

}
