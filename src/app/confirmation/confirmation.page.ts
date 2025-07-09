import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonInput,
  IonContent,
  IonButtons,
  IonBackButton,
  IonHeader,
  IonTitle,
  IonIcon,
  IonButton,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, arrowBackOutline } from 'ionicons/icons';
import { AuthserviceService } from '../services/authservice.service';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
  standalone: true,
  imports: [
      IonInput,
    IonContent,
    IonBackButton,
    IonButtons,
    IonHeader,
    IonTitle,
    IonButton,
    IonIcon,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class ConfirmationPage implements OnInit {
  authservice = inject(AuthserviceService);
  dataService = inject (DataService)

  constructor() {
    addIcons({ mailOutline, arrowBackOutline });
  }

  ngOnInit() {}

  async confirmation(){
    await this.authservice.confirm();
     this.dataService.addUser();
  }
}

