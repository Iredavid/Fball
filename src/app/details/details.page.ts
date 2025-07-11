import { Component, OnInit, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormsModule } from '@angular/forms';
import {
  IonIcon,
  IonContent,
  IonButton,
  IonLabel,
  IonItem,
  IonThumbnail,
  IonSegment,
  IonSegmentButton,
  IonHeader,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, bookmarkOutline, bookmark } from 'ionicons/icons';
import { AuthserviceService } from '../services/authservice.service';
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonIcon,
    IonContent,
    IonItem,
    IonButton,
    IonThumbnail,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    IonHeader,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class DetailsPage {
  dataService = inject(DataService);
  route = inject(ActivatedRoute);
  authservice = inject(AuthserviceService) 

  data: any;
  player: any;
  clubs: [] = [];

  constructor() {
    addIcons({ bookmarkOutline, bookmark, arrowBackOutline });
        this.getSingleClub();
    
  }

   ngOnInit() {
        this.authservice.getUserProfile();
   }

  async getSingleClub() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.data = await this.dataService.getItemById(id);
      console.log(this.data);
    }
    this.iconRender()
  }
  iconAn() {
    const iconElement = document.querySelector('.save-icon');

    const currentName = iconElement?.getAttribute('name');

    if (currentName?.includes('-outline')) {
      // Change to filled version
      const filledName = currentName.replace('-outline', '');
      iconElement?.setAttribute('name', filledName);
      iconElement?.classList.add('saved'); // Add your color class
      this.dataService.addFavorites(this.data.id,'epl','clubs');
    } else {
      // Change back to outline version
      const outlineName = currentName + '-outline';
      iconElement?.setAttribute('name', outlineName);
      iconElement?.classList.remove('saved'); // Remove color class
      this.dataService.removeFavorites(this.data.id,'epl','clubs');
    }
  }

  iconRender() {
    if (this.data.favorites) {
      const iconElement = document.querySelector('.save-icon');
      const currentName = iconElement?.getAttribute('name');

      if (currentName?.includes('-outline')) {
        // Change to filled version
        const filledName = currentName.replace('-outline', '');
        iconElement?.setAttribute('name', filledName);
        iconElement?.classList.add('saved'); // Add your color class
      }
    }
  }
}
