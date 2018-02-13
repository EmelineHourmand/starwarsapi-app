import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiProvider {

  private url = "https://swapi.co/api/";

    constructor(public http: HttpClient) {}

    getPlanets(callback) {
        return this.http.get(this.url+"planets/").subscribe(callback);
    }
    getPeoples(callback) {
        return this.http.get(this.url+"people/").subscribe(callback);
    }
    getStarships(callback) {
        return this.http.get(this.url+"starships/").subscribe(callback);
    }
    getVehicles(callback) {
        return this.http.get(this.url+"vehicles/").subscribe(callback);
    }
    getSpecies(callback) {
        return this.http.get(this.url+"species/").subscribe(callback);
    }
    getFilms(callback) {
        return this.http.get(this.url+"films/").subscribe(callback);
    }

    getViaUrl(url,callback) {
        return this.http.get(url).subscribe(callback);
    }
    getAllViaUrl(url,callbackWriter,loader) {
        this.http.get(url).subscribe((data)=>{
            var toPush=1;
            var array_data = Object.keys(data).map((key) => { return [key,data[key]]; });
            var i = 0;
            toPush=0;
            array_data.forEach((key)=>{
                if(key[1].constructor === Array){
                    toPush++;
                    var temp_tab = [];
                    key[1].forEach((k)=>{
                        var index = i;
                        this.getViaUrl(k,(detail)=>{
                            temp_tab.push(detail);
                            if(temp_tab.length === array_data[index][1].length){
                                array_data[index][1] = temp_tab;
                                toPush--;
                            }
                            if(toPush===0) {
                                var obj = {};
                                array_data.forEach((data)=>{
                                    obj[data[0]] = data[1];
                                });
                                callbackWriter(obj)
                                loader.dismiss();
                            }
                        });
                    })
                }
                i++;
            })
        })
    }
}
