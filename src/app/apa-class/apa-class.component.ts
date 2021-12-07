import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BreedDescriptionService } from '../breed-description.service';

@Component({
  selector: 'app-apa-class',
  templateUrl: './apa-class.component.html',
  styleUrls: ['./apa-class.component.scss']
})
export class ApaClassComponent implements OnInit {

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
