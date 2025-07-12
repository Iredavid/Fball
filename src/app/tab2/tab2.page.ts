import { Component, inject, OnInit} from '@angular/core';
import { IonHeader,IonMenu,IonButton,IonMenuToggle,  IonCardHeader, IonCardTitle, IonCardSubtitle, IonToolbar, IonCardContent,IonCard, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
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
}
