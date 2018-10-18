import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { MazePage } from '../maze/maze';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MazePage;
  tab2Root = AboutPage;

  constructor() {

  }
}
