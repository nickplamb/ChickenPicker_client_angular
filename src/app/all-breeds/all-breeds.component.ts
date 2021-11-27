import { Component, OnInit } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';
import { BreedDescriptionService } from '../breed-description.service';

@Component({
  selector: 'app-all-breeds',
  templateUrl: './all-breeds.component.html',
  styleUrls: ['./all-breeds.component.scss']
})
export class AllBreedsComponent implements OnInit {

  breeds: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public breedDescriptionService: BreedDescriptionService
  ) { }

  ngOnInit(): void {
    this.getBreeds();
  }

  getBreeds(): void {
    this.fetchApiData.getAllBreeds().subscribe((response: any) => {
      this.breeds = this.breedDescriptionService.addImageUrlToBreeds(response);
    });
  }

}
