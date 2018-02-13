import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class PlanetsServiceProvider {

    apiUrl = "https://swapi.co/api/planets";

  constructor(public http: HttpClient) {
  }
  
  public getPlanets(callback){
  }


}
