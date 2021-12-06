import { Component, Input, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BreedDescriptionService } from '../breed-description.service';

@Component({
  selector: 'app-breed-details-card',
  templateUrl: './breed-details-card.component.html',
  styleUrls: ['./breed-details-card.component.scss']
})
export class BreedDetailsCardComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public breed: any,
    public convertBreedData: BreedDescriptionService
  ) { }

  ngOnInit(): void {
  }

}
