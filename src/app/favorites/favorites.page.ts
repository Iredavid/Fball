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
import { Router } from '@angular/router';

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
  router = inject(Router)
  favoritePlayers: any[] = [];
  selectedClub: any;
  selectedPlayer: any;
  ClubData: any;
  PlayerData: any;
  isLoading = false;
  showPlayers= false;
  showClubs= false;
  constructor() {
    addIcons({ arrowBackOutline });
  }

  async ngOnInit() {
    console.log(document.querySelector('ion-header'));
    
     const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.showClubs = await navigation.extras.state['showClubs'] || false;
      this.showPlayers = await navigation.extras.state['showPlayers'] || false;
    }
    this.favorites = this.dataService.fave();
    this.favoritePlayers = this.dataService.favoPlay();
    this.initializeSegments();
    this.isLoading = true;
    try {
      await this.dataService.getFavorite();
      this.favorites = this.dataService.fave();
      this.favoritePlayers = this.dataService.favoPlay();
      this.initializeSegments();
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      this.isLoading = false;
    }
  }

  initializeSegments() {
    if (this.favorites.length > 0) {
      this.selectedClub = this.favorites[0].id;
      this.onClubSegmentChange();
    }

    if (this.favoritePlayers.length > 0) {
      this.selectedPlayer = this.favoritePlayers[0].id;
      this.onPlayerSegmentChange();
    }
  }

  onClubSegmentChange() {
    if (this.selectedClub) {
      this.ClubData = this.favorites.find(
        (club) => club.id === this.selectedClub
      );
      console.log('Selected club data:', this.ClubData);
    }
  }

  onPlayerSegmentChange() {
    if (this.selectedPlayer) {
      this.PlayerData = this.favoritePlayers.find(
        (player) => player.id === this.selectedPlayer
      );
      console.log('Selected player data:', this.PlayerData);
    }
  }
}
