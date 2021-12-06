import { Component, Input, OnInit } from '@angular/core';

import { BreedDescriptionService } from '../breed-description.service';

@Component({
  selector: 'app-breed-details-card',
  templateUrl: './breed-details-card.component.html',
  styleUrls: ['./breed-details-card.component.scss']
})
export class BreedDetailsCardComponent implements OnInit {

  @Input() breed: any;

  constructor(public convertBreedData: BreedDescriptionService) { }

  ngOnInit(): void {
  }

}
