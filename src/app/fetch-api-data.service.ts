import { Injectable } from '@angular/core';

import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

const apiUrl = 'https://chickens-api.herokuapp.com';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  //inject the HttpClient module to the constructor params
  //this will provide HttpClient to the entire class, making it available via this.http
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Making api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(`${apiUrl}/users`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public userLogin(userCredentials: any): Observable<any> {
    return this.http.post(`${apiUrl}/login`, userCredentials).pipe(
      catchError(this.handleError)
    );
  }

  public userLogout(): void {
    localStorage.clear()
    this.router.navigate(['welcome']);
  }

  public updateUserInfo(userDetails: any): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.put(`${apiUrl}/users`, userDetails, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public deleteUserAccount(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}/users`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }), 
      responseType: 'text' //server responds with simple message stating that the account was deleted.
    }).pipe(
      catchError(this.handleError)
    );
  }

  public getUserFavorites(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/users/favorites`, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public addToUserFavorites(breedId: string): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.post(`${apiUrl}/users/favorites/${breedId}`, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public removeFromUserFavorites(breedId: string): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}/users/favorites/${breedId}`, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getAllBreeds(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/breeds`, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getSingleBreed(breed: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/breeds/${breed}`, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getBreedsByEggColor(color: string): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/eggs/${color}`, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getBreedsByApaClass(apaClass: string): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/class/${apaClass}`, {headers: new HttpHeaders({
      Authorization: `Bearer ${token}`
    })}).pipe(
      map<any, any>(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  // non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {  };
  }

  private handleError(error: HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent) {
      console.error('Some error occurred: ', error.error.message);
    } else {
      console.error(`Error Status code ${error.status}, Error body is: ${error.error}`);
    }
    return throwError('Something bad happened; please try later.');
  }
}