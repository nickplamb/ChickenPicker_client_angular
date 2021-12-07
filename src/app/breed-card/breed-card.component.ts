import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { FetchApiDataService } from '../fetch-api-data.service';
import { BreedDescriptionService } from '../breed-description.service';
import { UserDataStoreService } from '../user-data-store.service';

import { BreedDetailsCardComponent } from '../breed-details-card/breed-details-card.component';
import { ApaClassComponent } from '../apa-class/apa-class.component';
import { BreedPurposeComponent } from '../breed-purpose/breed-purpose.component';

@Component({
  selector: 'app-breed-card',
  templateUrl: './breed-card.component.html',
  styleUrls: ['./breed-card.component.scss']
})
export class BreedCardComponent implements OnInit {

  @Input() breedsToDisplay:any[] = [];

  breeds: any[] = [];
  userFavoriteBreeds: any[] = [];
  backupImgUrl: string = '../../assets/breed_photos/frankie2.jpeg';

  _subscription_UserFavoriteBreeds;

  constructor(
    private fetchApiData: FetchApiDataService,
    public convertBreedData: BreedDescriptionService, // Public to be used in the template
    public userDataStore: UserDataStoreService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this._subscription_UserFavoriteBreeds = this.userDataStore.userFavorites.subscribe(data => {
      this.userFavoriteBreeds = data.map((obj: any) => obj._id);
    });
  }

  ngOnInit(): void {
  }

  /**
   * 
   * @param breed 
   * 
   * Opens the dialog displaying more details about a single breed
   */
  openBreedDetailsDialog(breed: any): void {
    this.dialog.open(BreedDetailsCardComponent, {
      width: '400px',
      data: {
        breed: breed,
      }
    });
  }

  /**
   * 
   * @param apaClass 
   * 
   * Opens the dialog displaying details about the APA Class
   */
  openApaClassDetailsDialog(apaClass: string): void {
    this.dialog.open(ApaClassComponent, {
      width: '400px',
      data: {
        apaClass: apaClass
      }
    });
  }

  /**
   * 
   * @param purpose
   *  
   * Opens the dialog displaying details the breeds purpose
   */
  openBreedPurposeDetailsDialog(purpose: string): void {
    this.dialog.open(BreedPurposeComponent, {
      width: '400px',
      data: {
        breedPurpose: purpose
      },
    });
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
          this.userDataStore.updateUserFavorites(response);
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