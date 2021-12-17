/**
 * @module
 * Breed Purpose Component
 */
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BreedDescriptionService } from '../breed-description.service';

@Component({
  selector: 'app-breed-purpose',
  templateUrl: './breed-purpose.component.html',
  styleUrls: ['./breed-purpose.component.scss']
})

/**
 * Renders info about a breed purpose in a dialog from {@link BreedCardComponent}.
 */
export class BreedPurposeComponent implements OnInit {

  /**
   * Breed purpose passed as props from parent component.
   */
  breedPurpose: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public breedDescriptionService: BreedDescriptionService,
  ) {
    this.breedPurpose = data.breedPurpose;
  }

  ngOnInit(): void {
  }

}