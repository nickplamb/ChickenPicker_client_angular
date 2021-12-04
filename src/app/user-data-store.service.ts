import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject ,Subject } from 'rxjs';

import { BreedDescriptionService } from './breed-description.service';
import { tUserData } from './user-profile/user-profile.component';

@Injectable({
  providedIn: 'root'
})
export class UserDataStoreService {
  //https://stackoverflow.com/questions/50067218/where-to-store-global-data-in-angular

  // BehaviorSubject will return the current value, regular Subject triggers only on .next() call.
  userFavorites: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  userData: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(
    private breedDescriptionService: BreedDescriptionService,
  ) { }

  public updateUserFavorites(data: Object[]): void {
    this.userFavorites.next(this.breedDescriptionService.addImageUrlToBreeds(data));
  }

  public updateUserData(data: tUserData): void {
      this.userData.next(data);
  }

}
