import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Film } from "../film/film";
import { FilmsServiceProvider } from "../../providers/films-service/films-service";

import { LoadingController } from 'ionic-angular';

@Component({
    selector: 'page-films',
    templateUrl: './films.html'
})

export class Films {

    films: any = [];

    navCtrl: any;

    loader: any;

    constructor(public navCtrl_: NavController, public filmsServiceProvider: FilmsServiceProvider,public loadingCtrl: LoadingController,public nav: NavParams) {
        this.navCtrl = navCtrl_;

        this.presentLoading();

        filmsServiceProvider.getFilms((data)=>{
            data.results.forEach((result)=>{
                var explode = result.url.split('/');
                result['id'] = explode[explode.length-2];
                this.films.push(result);
            })
            this.films.sort(function(a, b) {
                return a.id - b.id  ||  a.name.localeCompare(b.name);
            });
            this.films = data.results;
            this.dismissLoader()
        });
    }

    presentLoading() {
        this.loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        this.loader.present();
    }

    dismissLoader(){
        this.loader.dismiss();
    }

    itemTapped = (event, item) => {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(Film, {
            url: item.url
        });
    }
}
