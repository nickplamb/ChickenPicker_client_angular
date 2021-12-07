import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BreedDescriptionService } from '../breed-description.service';

@Component({
  selector: 'app-breed-purpose',
  templateUrl: './breed-purpose.component.html',
  styleUrls: ['./breed-purpose.component.scss']
})
export class BreedPurposeComponent implements OnInit {

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