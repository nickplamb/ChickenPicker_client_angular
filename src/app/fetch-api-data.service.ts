/**
 * @module
 * Fetch Api Data Service
 */
import { Injectable } from '@angular/core';

import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

/**
 * Class contains all interaction with Chicken Picker Api as well as logout function.
 */
export class FetchApiDataService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
  
  /**
   * The root url for the API.
   */
  private apiUrl = 'https://chickens-api.herokuapp.com';
    
  /**
   * User registration.
   * @param userDetails Contains user details submitted through registration form
   * @returns 
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * User login.
   * @param userCredentials Object with username and password
   * @returns 
   */
  public userLogin(userCredentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userCredentials).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * User logout.
   * Clears localStorage and navigates to /welcome.
   */
  public userLogout(): void {
    localStorage.clear()
    this.router.navigate(['welcome']);
  }

  /**
   * Update user info.
   * @param userDetails Object containing user data to be updated
   * @returns 
   */
  public updateUserInfo(userDetails: any): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.put(`${this.apiUrl}/users`, userDetails, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Delete user account.
   * @returns 
   */
  public deleteUserAccount(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}/users`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }), 
      responseType: 'text' //server responds with simple message stating that the account was deleted.
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get User Favorites.
   * @returns 
   */
  public getUserFavorites(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/users/favorites`, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Add a breed to the users favorites list.
   * @param breedId Breed ID
   * @returns 
   */
  public addToUserFavorites(breedId: string): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/users/favorites/${breedId}`, null, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Removes a breed from the users favorites list.
   * @param breedId Breed ID
   * @returns 
   */
  public removeFromUserFavorites(breedId: string): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}/users/favorites/${breedId}`, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves all chicken breeds.
   * @returns 
   */
  public getAllBreeds(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/breeds`, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieve a single breed by name.
   * @param breed Name of a breed
   * @returns 
   */
  public getSingleBreed(breed: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/breeds/${breed}`, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves all breeds that lay specified egg color.
   * @param color An egg color
   * @returns 
   */
  public getBreedsByEggColor(color: string): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/eggs/${color}`, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves all breeds in specified APA class.
   * @param apaClass The name of an APA class
   * @returns 
   */
  public getBreedsByApaClass(apaClass: string): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/class/${apaClass}`, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Non-typed response extraction.
   * @param res 
   * @returns 
   */
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {  };
  }

  /**
   * @param error 
   * @returns 
   */
  private handleError(error: HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent) {
      console.error('Some error occurred: ', error.error.message);
    } else {
      console.error(`Error Status code ${error.status}, Error body is: ${error.error}`);
    }
    return throwError('Something bad happened; please try later.');
  }
}