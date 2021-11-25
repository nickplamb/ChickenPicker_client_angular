import { Component, OnInit } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-all-breeds',
  templateUrl: './all-breeds.component.html',
  styleUrls: ['./all-breeds.component.scss']
})
export class AllBreedsComponent implements OnInit {

  breeds: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService
  ) { }

  ngOnInit(): void {
    this.getBreeds();
  }

  getBreeds(): void {
    this.fetchApiData.getAllBreeds().subscribe((response: any) => {
      response.forEach((breed: any) => {
        breed.imgUrl = `../../assets/breed_photos/${breed.breed.replace(/\s+/g, '').toLowerCase()}.jpg`;
      });
      this.breeds = response;
    });
  }

}
