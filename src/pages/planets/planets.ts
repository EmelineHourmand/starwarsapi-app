import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { Planet } from "../planet/planet";
import { ApiProvider} from "../../providers/api/api";

@Component({
  templateUrl: './planets.html',
  providers: [ApiProvider]
})

export class Planets{

  public planets: Array<Object> = [];
  public planetsRecover: Array<Object> = [];
  private loading;



  constructor(public loadingCtrl: LoadingController,public apiProvider: ApiProvider, public navCtrl: NavController, public navParams: NavParams){
    this.presentLoadingCustom()
    this.loadData("https://swapi.co/api/planets")
  }

  presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...'
    });
    this.loading.present();
  }

  loadData(url){
    this.apiProvider.getViaUrl(url,(data)=>{
      if(data.next == "https://swapi.co/api/planets/?page=2"){
        this.planets = data.results
      }else{
        this.planets = this.planets.concat(data.results)
        this.planetsRecover = this.planets
      }
      if(data.next != null){
        this.loadData(data.next)
      }
      this.dismissLoader()
    });
  }

  dismissLoader(){
    this.loading.dismiss()
  }

  getItems(ev: any) {
    this.planets = this.planetsRecover
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.planets = this.planets.filter((item:any) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Planet, {
      url: item.url
    });
  }
}



  
