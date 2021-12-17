/**
 * @module
 * Breed Details Card Component
 */
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BreedDescriptionService } from '../breed-description.service';

@Component({
  selector: 'app-breed-details-card',
  templateUrl: './breed-details-card.component.html',
  styleUrls: ['./breed-details-card.component.scss']
})

/**
 * Renders the extended details about a breed.
 */
export class BreedDetailsCardComponent implements OnInit {

  /**
   * Breed object passed from parent component, set in constructor.
   */
  breed: any;

  backupImgUrl: string = 'assets/breed_photos/frankie2.jpeg';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public convertBreedData: BreedDescriptionService,
  ) {
    this.breed = data.breed;
   }

  ngOnInit(): void {
  }
}
