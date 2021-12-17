/**
 * @module
 * Breed Card Component
 */
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Services
import { BreedDescriptionService } from '../breed-description.service';
import { UserDataStoreService } from '../user-data-store.service';

// Components
import { BreedDetailsCardComponent } from '../breed-details-card/breed-details-card.component';
import { ApaClassComponent } from '../apa-class/apa-class.component';
import { BreedPurposeComponent } from '../breed-purpose/breed-purpose.component';

@Component({
  selector: 'app-breed-card',
  templateUrl: './breed-card.component.html',
  styleUrls: ['./breed-card.component.scss']
})

/**
 * Renders multiple breed cards, one for each breed passed to it in array by parent component.
 */
export class BreedCardComponent implements OnInit {

  /**
   * Breeds array passed from parent component
   */
  @Input() breedsToDisplay:any[] = [];

  backupImgUrl: string = 'assets/breed_photos/frankie2.jpeg';

  constructor(
    public convertBreedData: BreedDescriptionService, // Public to be used in the template
    public userDataStore: UserDataStoreService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Opens the dialog displaying more details about a single breed
   * @param breed breed object
   */
  public openBreedDetailsDialog(breed: any): void {
    this.dialog.open(BreedDetailsCardComponent, {
      width: '450px',
      data: {
        breed: breed,
      }
    });
  }

  /**
   * Opens the dialog displaying details about the APA Class
   * @param apaClass name of an APA class
   */
  public openApaClassDetailsDialog(apaClass: string): void {
    this.dialog.open(ApaClassComponent, {
      width: '600px',
      data: {
        apaClass: apaClass
      }
    });
  }

  /**
   * Opens the dialog displaying details the breeds purpose
   * @param purpose the name of a purpose
   */
  public openBreedPurposeDetailsDialog(purpose: string): void {
    this.dialog.open(BreedPurposeComponent, {
      width: '600px',
      data: {
        breedPurpose: purpose
      },
    });
  }
}