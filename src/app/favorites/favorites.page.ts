import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButtons,IonBackButton,IonContent,IonSegment,IonSegmentButton, IonLabel,IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonContent, IonButtons,IonBackButton,IonSegment,IonSegmentButton,IonLabel, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FavoritesPage implements OnInit {
  favorites: any;
  dataService = inject(DataService);

  constructor() { 
    addIcons({arrowBackOutline});
    this.dataService.getFavoriteClub();
  }

  ngOnInit() {
    this.favorites = this.dataService.favorites;
  }

}
