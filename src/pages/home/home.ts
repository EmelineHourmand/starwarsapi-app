import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Films } from "../films/films";
import { Peoples } from "../peoples/peoples";
import { Starships } from "../starships/starships";
import { Species } from "../species/species";
import { Planets } from "../planets/planets";
import { Vehicles } from "../vehicles/vehicles";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  itemTapped(type) {
    // That's right, we're pushing to ourselves!
    switch(type){
      case "Starships":
        this.navCtrl.push(Starships);
        break;
      case "Species":
        this.navCtrl.push(Species);
        break;
      case "Vehicles":
        this.navCtrl.push(Vehicles);
        break;
      case "Films":
        this.navCtrl.push(Films);
        break;
      case "Peoples":
        this.navCtrl.push(Peoples);
        break;
      case "Planets":
        this.navCtrl.push(Planets);
        break;
      default:
        return;
    }

  }

}
