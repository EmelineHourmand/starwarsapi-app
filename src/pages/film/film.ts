import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ApiProvider } from "../../providers/api/api";
import {People} from "../people/people";
import {Vehicle} from "../vehicle/vehicle";
import {Starship} from "../starship/starship";
import {Planet} from "../planet/planet";

@Component({
    selector: 'page-film',
    templateUrl: './film.html',

})
export class Film {
    film: any;

    selectedItem: any;

    loader: any;

    constructor(public navCtrl: NavController, public apiProvider: ApiProvider, public navParams: NavParams, public loadingCtrl: LoadingController) {
        this.selectedItem = navParams.get('url');
        this.presentLoading();
        this.film = null;
        this.apiProvider.getAllViaUrl(this.selectedItem,(data)=>{
                var explode = data.url.split('/');
                data['id'] = explode[explode.length-2];
                this.film = data;
            }
            , this.loader);
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
        var explode = item.split('/');
        switch (explode[4]){
            case 'people':
                this.navCtrl.push(People, {
                    url: item
                });
                break
            case 'vehicles':
                this.navCtrl.push(Vehicle, {
                    url: item
                });
                break
            case 'planets':
                this.navCtrl.push(Planet, {
                    url: item
                });
                break
            case 'starships':
                this.navCtrl.push(Starship, {
                    url: item
                });
                break
            default:
                break
        }
    }
}
