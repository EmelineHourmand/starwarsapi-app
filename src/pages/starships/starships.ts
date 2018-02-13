import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams} from 'ionic-angular';
import { ApiProvider} from "../../providers/api/api";
import {Starship} from "../starship/starship";

@Component({
  templateUrl: './starships.html',
  providers: [ApiProvider]
})

export class Starships {


  public starships: Array<Object> = [];
  public starshipsRecover: Array<Object> = [];
  private loading;

  constructor(public loadingCtrl: LoadingController,public apiProvider: ApiProvider, public navCtrl: NavController, public navParams: NavParams){
    this.presentLoadingCustom()
    this.loadData("https://swapi.co/api/starships")
  }

  presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...'
    });
    this.loading.present();
  }

  dismissLoader(){
    this.loading.dismiss()
  }

  loadData(url){
    this.apiProvider.getViaUrl(url,(data)=>{
      if(data.next == "https://swapi.co/api/starships/?page=2"){
        this.starships = data.results
      }else{
        this.starships = this.starships.concat(data.results)
        this.starshipsRecover = this.starships
      }
      console.log(this.starships)
      if(data.next != null){
        this.loadData(data.next)
      }
      this.dismissLoader()
    });
  }

  getItems(ev: any) {
    this.starships = this.starshipsRecover
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.starships = this.starships.filter((item:any) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(Starship, {
      url: item.url
    });
  }
}