import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tUserData } from './user-profile/user-profile.component';

@Injectable({
  providedIn: 'root'
})
export class UserDataStoreService {
  //https://stackoverflow.com/questions/50067218/where-to-store-global-data-in-angular

  userFavorites: Subject<any> = new Subject<any>();
  userData:  Subject<any> = new Subject<any>();

  constructor() { }

  updateUserFavorites(data: any[]): void {
    this.userFavorites.next(data);
  }

  updateUserData(data: tUserData): void {
    this.userData.next(data);
  }

}
