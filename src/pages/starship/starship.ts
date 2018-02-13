import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams} from 'ionic-angular';
import { ApiProvider} from "../../providers/api/api";
import { Film } from "../../pages/film/film";
import { People } from "../../pages/people/people";

@Component({
  templateUrl: './starship.html',
  providers: [ApiProvider]
})

export class Starship {

  public starship:any;

  public pilots: Array<Object> = [];
  public films: Array<Object> = [];
  public img: String;

  private loading;

  constructor(public loadingCtrl: LoadingController,public apiProvider: ApiProvider, public navCtrl: NavController, public navParams: NavParams){
    this.presentLoadingCustom()

    this.apiProvider.getViaUrl(navParams.data.url, (data)=>{
      this.starship = data
      data.pilots.forEach((element)=>{
        this.apiProvider.getViaUrl(element, (data)=>{
          this.pilots.push(data)
        })
      })
      data.films.forEach((element)=>{
        this.apiProvider.getViaUrl(element, (data)=>{
          this.films.push(data)
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
    console.log(this.loading);
    this.loading.present();
  }

  dismissLoader(){
    this.loading.dismiss()
  }

  itemTappedPeople(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(People, {
      url: item.url
    });
  }
  itemTappedFilms(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Film, {
      url: item.url
    });
  }
}
