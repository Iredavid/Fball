import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {IonHeader,IonGrid,IonCol, IonRow, IonToolbar,IonSegment,IonSegmentButton,IonSelectOption,IonList,IonSelect, IonIcon,IonSearchbar,IonTitle, IonNote,IonContent,IonItem,IonLabel,IonAvatar,IonBadge,  } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../environments/explore-container/explore-container.component';
import{register} from 'swiper/element/bundle'
register()

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonHeader,IonGrid,IonCol, IonRow, IonToolbar,IonSegment,IonSegmentButton,IonSelectOption,IonList,IonSelect, IonIcon,IonSearchbar,IonTitle, IonNote,IonContent,IonItem,IonLabel,IonAvatar,IonBadge,]
})
export class Tab2Page {

  constructor() {}

}
