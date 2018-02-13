import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams} from 'ionic-angular';
import { ApiProvider} from "../../providers/api/api";
import { Starship } from "../../pages/starship/starship";
import { Film } from "../../pages/film/film";
import { Vehicle } from "../../pages/vehicle/vehicle";
import { Specie } from "../../pages/specie/specie";

@Component({
  templateUrl: './people.html',
  providers: [ApiProvider]
})

export class People {

  public people:Array<Object> = [];
  public starships:Array<Object> = [];
  public vehicles:Array<Object> = [];
  public films:Array<Object> = [];
  public species:Array<Object> = [];
  private loading;

  constructor(public loadingCtrl: LoadingController,public apiProvider: ApiProvider, public navCtrl: NavController, public navParams: NavParams){
    this.presentLoadingCustom()
    console.log(navParams)
    this.apiProvider.getViaUrl(navParams.data.url, (data)=>{
      this.people = data
      data.starships.forEach((element)=>{
        this.apiProvider.getViaUrl(element, (data)=>{
          this.starships.push(data)
        })
      })
      data.vehicles.forEach((element)=>{
        this.apiProvider.getViaUrl(element, (data)=>{
          this.vehicles.push(data)
        })
      })
      data.films.forEach((element)=>{
        this.apiProvider.getViaUrl(element, (data)=>{
          this.films.push(data)
        })
      })
      data.species.forEach((element)=>{
        this.apiProvider.getViaUrl(element, (data)=>{
          this.species.push(data)
        })
      })
    })
      this.dismissLoader()
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
    // That's right, we're pushing to ourselves!
    switch(type){
      case "Starship":
        this.navCtrl.push(Starship, {
          url: item.url
        });
        break;
      case "Specie":
        this.navCtrl.push(Specie, {
          url: item.url
        });
        break;
      case "Vehicle":
        this.navCtrl.push(Vehicle, {
          url: item.url
        });
        break;
      case "Film":
        this.navCtrl.push(Film, {
          url: item.url
        });
        break;
      default:
        return;
    }
    
  }
}