import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PeopleServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PeopleServiceProvider {

  apiUrl = "https://swapi.co/api/people";

  constructor(public http: HttpClient) {
    console.log('Hello PeopleServiceProvider Provider');
  }

  public getPeoples(callback){
    return this.http.get(this.apiUrl).subscribe(callback);
  }
  public getPeople(url, callbackSucess, cbErr, cbDone){
    return this.http.get(url).subscribe(callbackSucess, cbErr, cbDone);
  }

}
