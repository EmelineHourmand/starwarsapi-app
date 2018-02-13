import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ApiProvider } from '../providers/api/api';
import { PlanetsServiceProvider } from '../providers/planets-service/planets-service';
import { VehiculesServiceProvider } from '../providers/vehicules-service/vehicules-service';
import { PeopleServiceProvider } from '../providers/people-service/people-service';
import { FilmsServiceProvider } from '../providers/films-service/films-service';
import { SpeciesServiceProvider } from '../providers/species-service/species-service';

import { Starships } from '../pages/starships/starships';
import { Starship } from "../pages/starship/starship";
import { Planets } from "../pages/planets/planets";
import { Planet } from "../pages/planet/planet";
import { Peoples } from "../pages/peoples/peoples";
import { People } from "../pages/people/people";
import { Vehicles } from "../pages/vehicles/vehicles";
import { Vehicle } from "../pages/vehicle/vehicle";
import { Species } from "../pages/species/species";
import { Specie } from "../pages/specie/specie";
import { Films } from "../pages/films/films";
import { Film } from "../pages/film/film";
import {HttpClientModule} from "@angular/common/http";
import { Quizz } from "../pages/quizz/quizz";

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    Films,
    Film,
    Starships,
    Starship,
    Peoples,
    People,
    Vehicle,
    Vehicles,
    Specie,
    Species,
    Planet,
    Planets,
    Quizz
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    Films,
    Film,
    Starships,
    Starship,
    Peoples,
    People,
    Vehicle,
    Vehicles,
    Specie,
    Species,
    Planet,
    Planets,
    Quizz
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlanetsServiceProvider,
    VehiculesServiceProvider,
    PeopleServiceProvider,
    FilmsServiceProvider,
    SpeciesServiceProvider,
    ApiProvider,
  ]
})
export class AppModule {}
