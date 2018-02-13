import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams} from 'ionic-angular';
import { ApiProvider} from "../../providers/api/api";
import {People} from "../people/people";

@Component({
  templateUrl: './peoples.html',
  providers: [ApiProvider]
})

export class Peoples {

  public peoples: Array<Object> = [];
  public peoplesRecover: Array<Object> = [];
  private loading;

  constructor(public loadingCtrl: LoadingController,public apiProvider: ApiProvider, public navCtrl: NavController, public navParams: NavParams){
    this.presentLoadingCustom()
    this.loadData("https://swapi.co/api/people")
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
      if(data.next == "https://swapi.co/api/people/?page=2"){
        this.peoples = data.results
      }else{
        this.peoples = this.peoples.concat(data.results)
        this.peoplesRecover = this.peoples
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
    this.peoples = this.peoplesRecover
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.peoples = this.peoples.filter((item:any) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(People, {
      url: item.url
    });
  }
}