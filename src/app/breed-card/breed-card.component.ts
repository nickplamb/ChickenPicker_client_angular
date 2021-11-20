import { Component, OnInit } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-breed-card',
  templateUrl: './breed-card.component.html',
  styleUrls: ['./breed-card.component.scss']
})
export class BreedCardComponent implements OnInit {
  breeds: any[] = [];

  constructor(public fetchApiData: FetchApiDataService) { }

  ngOnInit(): void {
    this.getBreeds();
  }

  getBreeds(): void {
    this.fetchApiData.getAllBreeds().subscribe((response: any) => {
      response.forEach((breed: any) => {
        breed.imgUrl = `../../assets/breed_photos/${breed.breed.replace(/\s+/g, '').toLowerCase()}.jpg`;
      });
      this.breeds = response;
      console.log(this.breeds[0])
      // return this.breeds;
    });
  }

}
