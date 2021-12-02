import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';
import { BreedDescriptionService } from '../breed-description.service';

@Component({
  selector: 'app-breed-card',
  templateUrl: './breed-card.component.html',
  styleUrls: ['./breed-card.component.scss']
})
export class BreedCardComponent implements OnInit {

  @Input() breedsToDisplay:any[] = [];

  breeds: any[] = [];
  backupImgUrl: string = '../../assets/breed_photos/frankie2.jpeg';

  constructor(
    private fetchApiData: FetchApiDataService,
    public convertBreedData: BreedDescriptionService, // Public to be used in the template
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  addBreedToUserFavorites(breed: any): void {
    console.log(breed)
    this.fetchApiData.addToUserFavorites(breed._id).subscribe({
      next: response => {
        console.log(response);
        this.snackBar.open(`${breed.breed} has been added to your favorites`, 'OK', {
          duration: 2000
        });
      }, error: response => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000
        })
      }
    })
  }

  removeBreedFromUserFavorites(breed: any): void {
    this.fetchApiData.removeFromUserFavorites(breed._id).subscribe({
        next: response => {
          console.log(response);
          this.snackBar.open(`${breed.breed} has been removed from your favorites`, 'OK', {
            duration: 2000
          });
        }, error: response => {
          console.log(response);
          this.snackBar.open(response, 'OK', {
            duration: 2000
          })
        }
      })
  }

}