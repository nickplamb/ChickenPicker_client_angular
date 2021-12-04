import { Component, OnInit } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';
import { BreedDescriptionService } from '../breed-description.service';
import { UserDataStoreService } from '../user-data-store.service';

@Component({
  selector: 'app-all-breeds',
  templateUrl: './all-breeds.component.html',
  styleUrls: ['./all-breeds.component.scss']
})
export class AllBreedsComponent implements OnInit {

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

  private getAllBreeds(): void {
    this.fetchApiData.getAllBreeds().subscribe((response: any) => {
      this.breeds = this.breedDescriptionService.addImageUrlToBreeds(response);
    });
  }

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
