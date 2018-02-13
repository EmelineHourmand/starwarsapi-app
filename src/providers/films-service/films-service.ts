import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the FilmsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FilmsServiceProvider {

  apiUrl = "https://swapi.co/api/films";

  constructor(public http: HttpClient) {
  }

  public getFilms(callback){
    return this.http.get(this.apiUrl).subscribe(callback);
  }
  public getFilm(url, callbackSucess, cbErr, cbDone){
    return this.http.get(url).subscribe(callbackSucess, cbErr, cbDone);
  }

}
