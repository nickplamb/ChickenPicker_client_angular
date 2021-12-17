/**
 * @module
 * Apa Class Component
 */
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BreedDescriptionService } from '../breed-description.service';

@Component({
  selector: 'app-apa-class',
  templateUrl: './apa-class.component.html',
  styleUrls: ['./apa-class.component.scss']
})

/**
 * Renders a card in a dialog that gives details about an APA class
 */
export class ApaClassComponent implements OnInit {

  /**
   * The name of the APA class to give details about.
   */
  apaClass: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public breedDescriptionService: BreedDescriptionService,
  ) {
    this.apaClass = data.apaClass;
  }

  ngOnInit(): void {
  }

}
