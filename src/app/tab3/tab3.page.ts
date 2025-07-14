import { Component } from '@angular/core';
import {IonHeader,IonGrid,IonCol, IonRow, IonToolbar,IonSegment,IonSegmentButton,IonSelectOption,IonList,IonSelect, IonIcon,IonSearchbar,IonTitle, IonNote,IonContent,IonItem,IonLabel,IonAvatar,IonBadge, } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../environments/explore-container/explore-container.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader,IonGrid,IonCol, IonRow, IonToolbar,IonSegment,IonSegmentButton,IonSelectOption,IonList,IonSelect, IonIcon,IonSearchbar,IonTitle, IonNote,IonContent,IonItem,IonLabel,IonAvatar,IonBadge,],
})
export class Tab3Page {
  constructor() {}
}
