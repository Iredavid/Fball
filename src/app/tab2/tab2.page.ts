<<<<<<< HEAD
import { Component, inject, OnInit} from '@angular/core';
import { IonHeader,IonMenu,IonButton,IonMenuToggle,  IonCardHeader, IonCardTitle, IonCardSubtitle, IonToolbar, IonCardContent,IonCard, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { DataService } from '../services/data.service';
=======
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {IonHeader,IonGrid,IonCol, IonRow, IonToolbar,IonSegment,IonSegmentButton,IonSelectOption,IonList,IonSelect, IonIcon,IonSearchbar,IonTitle, IonNote,IonContent,IonItem,IonLabel,IonAvatar,IonBadge,  } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../environments/explore-container/explore-container.component';
import{register} from 'swiper/element/bundle'
register()
>>>>>>> 8bdfca4c816053bf7872ae5feaa23a42cc458c84

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
<<<<<<< HEAD
  imports: [IonHeader,IonMenu,IonButton,IonMenuToggle,  IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonToolbar, IonCard, IonTitle, IonContent, ExploreContainerComponent]
})
export class Tab2Page implements OnInit{
footballClub:any 
dataService= inject(DataService)

  constructor() {
    this.dataService.getFot()
  }

  ngOnInit(){
     console.log(this.footballClub);
       this.footballClub = this.dataService.footballClub
  }
goToDetails(){}
=======
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonHeader,IonGrid,IonCol, IonRow, IonToolbar,IonSegment,IonSegmentButton,IonSelectOption,IonList,IonSelect, IonIcon,IonSearchbar,IonTitle, IonNote,IonContent,IonItem,IonLabel,IonAvatar,IonBadge,]
})
export class Tab2Page {

  constructor() {}

>>>>>>> 8bdfca4c816053bf7872ae5feaa23a42cc458c84
}
