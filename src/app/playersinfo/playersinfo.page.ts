import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonBackButton,
  IonHeader,
  IonTitle,
  IonToolbar,
  AlertController,
} from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { bookmark, bookmarkOutline, pencilOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-playersinfo',
  templateUrl: './playersinfo.page.html',
  styleUrls: ['./playersinfo.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonButton,
    IonIcon,
    IonButtons,
    IonBackButton,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class PlayersinfoPage implements OnInit {
  dataService = inject(DataService);
  route = inject(ActivatedRoute);
  player: any;
  data: any;


  constructor(private alertController: AlertController) {
    addIcons({ pencilOutline,bookmarkOutline,bookmark });
  }

  ngOnInit() {
    this.getSinglePlayer();
  }

  async getSinglePlayer() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.player = await this.dataService.getPlayerById(id);
      console.log(this.player);
    }
  }

  async showMultipleInputsAlert() {
    const alert = await this.alertController.create({
      header: 'Multiple Inputs',
      inputs: [
        {
          name: 'firstName',
          value: this.player.firstName,
          placeholder: 'Firstname',
        },
        {
          name: 'surnName',
          value: this.player.surnName,
          placeholder: 'Surnname',
        },
        {
          name: 'bgimg',
          value: this.player.bgimg,
          placeholder: 'Image Address',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Save',
          handler: (data) => {
            // Save to component properties
            this.dataService.firstName = data.firstName;
            this.dataService.surnName = data.surnName;
            this.dataService.img = data.bgimg;
            console.log(data);
            // data contains {name: string, age: number, password: string}
            this.sendData();
          },
        },
      ],
    });
    await alert.present();
  }
  sendData() {
    this.dataService.updateTopPlayer(this.player.id);
  }
  iconAn(){
    const iconElement = document.querySelector('.save-icon');

    const currentName = iconElement?.getAttribute('name');

    if (currentName?.includes('-outline')) {
      // Change to filled version
      const filledName = currentName.replace('-outline', '');
      iconElement?.setAttribute('name', filledName);
      iconElement?.classList.add('saved'); // Add your color class
      this.dataService.addFavorites(this.player.id,'player','players');
    } else {
      // Change back to outline version
      const outlineName = currentName + '-outline';
      iconElement?.setAttribute('name', outlineName);
      iconElement?.classList.remove('saved'); // Remove color class
      this.dataService.removeFavorites(this.player.id, 'player','players');
      console.log(this.player.id);
      
    }

  }
}
