import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButtons,
  IonBackButton,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { DataService } from '../services/data.service';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonButtons,
    IonBackButton,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class FavoritesPage implements OnInit {
  favorites: any[] = [];
  dataService = inject(DataService);
  authservice = inject(AuthserviceService);
  faveClub=true
  favoritePlayers: any[] = [];
  constructor() {
    addIcons({ arrowBackOutline });

  }

  async ngOnInit() {
    await this.dataService.getFavorite();
    this.favorites = this.dataService.fave();
    console.log(this.dataService.fave());
    this.favoritePlayers = this.dataService.favoPlay();
    console.log(this.dataService.favoPlay());
    console.log(this.favorites);
    console.log(this.favoritePlayers);
    
    
    
  }
  
}
