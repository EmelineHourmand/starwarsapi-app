import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams} from 'ionic-angular';
import { ApiProvider} from "../../providers/api/api";
import { Specie } from "../specie/specie";

@Component({
  templateUrl: './species.html',
  providers: [ApiProvider]
})

export class Species {

  public species:any;
  public speciesRecover: Array<Object> = [];
  private loading;

  constructor(public loadingCtrl: LoadingController,public apiProvider: ApiProvider, public navCtrl: NavController, public navParams: NavParams){
    this.presentLoadingCustom()
    this.loadData("https://swapi.co/api/species")
  }

  loadData(url){
    this.apiProvider.getViaUrl(url,(data)=>{
      if(data.next == "https://swapi.co/api/species/?page=2"){
        this.species = data.results
      }else{
        this.species = this.species.concat(data.results)
        this.speciesRecover = this.species
      }
      if(data.next != null){
        this.loadData(data.next)
      }
      this.dismissLoader()
    });
  }

  getItems(ev: any) {
    this.species = this.speciesRecover
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.species = this.species.filter((item:any) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
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

  itemTapped(event, item) {
    this.navCtrl.push(Specie, {
      url: item.url
    });
  }
}