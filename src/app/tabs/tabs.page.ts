import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
<<<<<<< HEAD
import { triangle, ellipse, square } from 'ionicons/icons';
=======
import { triangle, ellipse, square, homeOutline, home } from 'ionicons/icons';
>>>>>>> 8bdfca4c816053bf7872ae5feaa23a42cc458c84

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
<<<<<<< HEAD
    addIcons({ triangle, ellipse, square });
=======
    addIcons({ square, ellipse, homeOutline,home });
>>>>>>> 8bdfca4c816053bf7872ae5feaa23a42cc458c84
  }
}
