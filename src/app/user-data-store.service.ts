/**
 * @module
 * User Data Store Service
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

import { BreedDescriptionService } from './breed-description.service';
import { tUserData } from './user-profile/user-profile.component';

@Injectable({
  providedIn: 'root'
})

/**
 * Global data storage class for user data
 */
export class UserDataStoreService {
  //https://stackoverflow.com/questions/50067218/where-to-store-global-data-in-angular

  // BehaviorSubject will return the current value, regular Subject triggers only on .next() call.
  /**
   * Array of breed ids representing their favorite breeds.
   */
  userFavorites: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  /**
   * The user object stored here.
   */
  userData: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(
    private breedDescriptionService: BreedDescriptionService,
  ) { }

  /**
   * Takes the array of breed objects, sends them to get an img url added, then updates the BehaviorSubject.
   * @param data array of breed objects in users favorites list.
   */
  public updateUserFavorites(data: Object[]): void {
    this.userFavorites.next(this.breedDescriptionService.addImageUrlToBreeds(data));
  }

  /**
   * Updates userData BehaviorSubject.
   * @param data tUserData object
   */
  public updateUserData(data: tUserData): void {
      this.userData.next(data);
  }

}
