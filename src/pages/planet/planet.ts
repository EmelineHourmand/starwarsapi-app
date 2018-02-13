import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams} from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Films } from "../../pages/films/films";
import { People } from "../../pages/people/people";
import { ApiProvider} from "../../providers/api/api";

@Component({
  templateUrl: "./planet.html",
  providers: [ApiProvider]
})

export class Planet{

    planet:any;
    residents:Array<Object> = [];
    films:Array<Object> = [];
    private loading;

    constructor(public loadingCtrl: LoadingController,public apiProvider: ApiProvider, 
      public navCtrl: NavController, public navParams: NavParams){
        this.presentLoadingCustom()
      console.log(navParams)
      this.apiProvider.getViaUrl(navParams.data.url, (data)=>{
        this.planet = data
        data.residents.forEach((element)=>{
          this.apiProvider.getViaUrl(element, (data)=>{
            this.residents.push(data)
          })
        })
        data.films.forEach((element)=>{
          this.apiProvider.getViaUrl(element, (data)=>{
            this.films.push(data)
          })
        })
        this.dismissLoader()
      })
    }


    presentLoadingCustom() {
      this.loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: 'Loading Please Wait...'
      });
      console.log(this.loading);
      this.loading.present();
    }

    dismissLoader(){
      this.loading.dismiss();
    }

    itemTappedPeople(event, item) {
      // That's right, we're pushing to ourselves!
      this.navCtrl.push(People, {
        url: item.url
      });
    }
    itemTappedFilms(event, item) {
      // That's right, we're pushing to ourselves!
      this.navCtrl.push(Films, {
        url: item.url
      });
    }
  
  }
  














