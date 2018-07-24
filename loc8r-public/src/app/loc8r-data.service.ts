import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Location, Review } from './location';

@Injectable({
  providedIn: 'root'
})
export class Loc8rDataService {

  constructor(private http: Http) { }

  private apiBaseUrl = 'http://localhost:3000/api/';
  //private apiBaseUrl = 'https://loc8r-yuangao.herokuapp.com/api';

  public getLocations(lat: number, lng: number): Promise<Location[]> {
    const maxDistance: number = 20000;
    const url: string = `${this.apiBaseUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as Location[])
      .catch(this.handleError);
  }

  public getLocationById(locationId: string): Promise<Location> {
    const url: string = `${this.apiBaseUrl}/locations/${locationId}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json() as Location)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  public addReviewByLocationId(locationId: string, formData: any): Promise<any> {
    const url: string = `${this.apiBaseUrl}locations/${locationId}/reviews`;
    return this.http
      .post(url, formData)
      .toPromise()
      .then(response => response.json() as Review)
      .catch(this.handleError);

  }
}
