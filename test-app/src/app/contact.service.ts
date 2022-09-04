import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { GlobalConstants } from './constants';

import { Contact } from './models/contact';
import { BaseResponse } from './models/base-response';


@Injectable({ providedIn: 'root' })
export class ContactService {

   private contactsUrl = `${GlobalConstants.baseUrl}api/contacts`;  // URL to web api
  //private contactsUrl = 'contacts'

  httpOptions = {
    // headers: new HttpHeaders(
    //   { 'Content-Type': 'application/json',
    //   'Access-Control-Allow-Methods' : 'GET',
    //   'Access-Control-Allow-Origin' : '*'})

    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' }
    )
  };

  constructor(
    private http: HttpClient) { }

  /** GET hero by id. Return `undefined` when id not found */
//   getHeroNo404<Data>(id: number): Observable<Hero> {
//     const url = `${this.heroesUrl}/?id=${id}`;
//     return this.http.get<Hero[]>(url)
//       .pipe(
//         map(heroes => heroes[0]), // returns a {0|1} element array
//         tap(h => {
//           const outcome = h ? 'fetched' : 'did not find';
//           this.log(`${outcome} hero id=${id}`);
//         }),
//         catchError(this.handleError<Hero>(`getHero id=${id}`))
//       );
//   }

  /** GET contact by id. Will 404 if id not found */
  getContact(id: number): Observable<Contact> {
    const url = `${this.contactsUrl}/${id}`;
    return this.http.get<Contact>(url).pipe(
      catchError(this.handleError<Contact>(`getContact id=${id}`))
    );
  }

  /* GET contacts whose name contains search term */
  searchContats(searchText: string, pageNumber: number, pageSize: number): Observable<BaseResponse<Contact[]>> {
    //TODO: Send in body of request
    return this.http.get<BaseResponse<Contact[]>>(
      `${this.contactsUrl}/?searchText=${searchText}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      // .pipe(catchError(this.handleError<BaseResponse<Contact[]>>('searchContacts', {}))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.contactsUrl, contact, this.httpOptions).pipe(
      catchError(this.handleError<Contact>('addContact'))
    );
  }

  /** DELETE: delete the hero from the server */
  removeContact(id: number): Observable<Contact> {
    const url = `${this.contactsUrl}/?contactId=${id}`;
    return this.http.delete<Contact>(url, this.httpOptions);
  }

  /** PUT: update the hero on the server */
  updateContact(contact: Contact): Observable<any> {
    return this.http.put(this.contactsUrl, contact, this.httpOptions);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}