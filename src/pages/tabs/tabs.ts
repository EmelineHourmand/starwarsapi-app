import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {Quizz} from "../quizz/quizz";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage
  tab2Root = Quizz
  tab3Root = ContactPage

  tabToShow : number = 1

  constructor() {

  }
}
