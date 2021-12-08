import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

/**
 * Services
 */
import { BreedDescriptionService } from '../breed-description.service';
import { UserDataStoreService } from '../user-data-store.service';

/**
 * Components
 */
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

  backupImgUrl: string = 'assets/breed_photos/frankie2.jpeg';

  constructor(
    public convertBreedData: BreedDescriptionService, // Public to be used in the template
    public userDataStore: UserDataStoreService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  /**
   * 
   * @param breed 
   * 
   * Opens the dialog displaying more details about a single breed
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
   * 
   * @param apaClass 
   * 
   * Opens the dialog displaying details about the APA Class
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
   * 
   * @param purpose
   *  
   * Opens the dialog displaying details the breeds purpose
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