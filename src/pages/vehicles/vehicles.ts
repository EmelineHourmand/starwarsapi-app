import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams} from 'ionic-angular';
import { ApiProvider} from "../../providers/api/api";
import { Vehicle } from "../vehicle/vehicle";

@Component({
  templateUrl: './vehicles.html',
  providers: [ApiProvider]
})

export class Vehicles {

  public vehicles:any;
  public vehiclesRecover: Array<Object> = [];
  private loading;

  constructor(public loadingCtrl: LoadingController,public apiProvider: ApiProvider, public navCtrl: NavController, public navParams: NavParams){
    this.presentLoadingCustom()
    this.loadData("https://swapi.co/api/vehicles")
  }

  loadData(url){
    this.apiProvider.getViaUrl(url,(data)=>{
      if(data.next == "https://swapi.co/api/vehicles/?page=2"){
        this.vehicles = data.results
      }else{
        this.vehicles = this.vehicles.concat(data.results)
        this.vehiclesRecover = this.vehicles
      }
      if(data.next != null){
        this.loadData(data.next)
      }
      this.dismissLoader()
    });
  }

  getItems(ev: any) {
    this.vehicles = this.vehiclesRecover
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.vehicles = this.vehicles.filter((item:any) => {
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
    this.navCtrl.push(Vehicle, {
      url: item.url
    });
  }
}