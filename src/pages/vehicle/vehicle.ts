import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams} from 'ionic-angular';
import { ApiProvider} from "../../providers/api/api";
import { Film } from "../../pages/film/film";
import { People } from "../../pages/people/people";

@Component({
  templateUrl: './vehicle.html',
  providers: [ApiProvider]
})

export class Vehicle {

  public vehicle:any;
  public films: Array<Object> = [];
  public peoples: Array<Object> = [];
  private loading;

  constructor(public loadingCtrl: LoadingController,public apiProvider: ApiProvider, public navCtrl: NavController, public navParams: NavParams){
    this.presentLoadingCustom()
    this.apiProvider.getViaUrl(navParams.data.url, (data)=>{
      this.vehicle = data
      data.films.forEach((element)=>{
        this.apiProvider.getViaUrl(element, (data)=>{
          this.films.push(data)
        })
      })

      data.pilots.forEach((element)=>{
        this.apiProvider.getViaUrl(element, (data)=>{
          this.peoples.push(data)
        })
      })

      this.dismissLoader()
    });
  }

  presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...'
    });
    this.loading.present();
  };

  dismissLoader(){
    this.loading.dismiss()
  }

  itemTapped(event, item, type) {
    switch(type){
      case "Films":
        this.navCtrl.push(Film, {
          url: item.url
        });
        break;
      case "Pilots":
        this.navCtrl.push(People, {
          url: item.url
        });
        break;
      default:
        return;
    }
  }
}