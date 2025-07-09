import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButtons,IonBackButton,IonContent,IonSegment,IonSegmentButton, IonLabel,IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonContent, IonButtons,IonBackButton,IonSegment,IonSegmentButton,IonLabel, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FavoritesPage implements OnInit {

  constructor() { 
    addIcons({arrowBackOutline})
  }

  ngOnInit() {
  }

}
