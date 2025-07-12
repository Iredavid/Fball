<<<<<<< HEAD
import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { IonHeader,IonButton,IonMenu, MenuController , IonAvatar, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {Filesystem  } from '@capacitor/filesystem'
=======
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  IonAccordionGroup,
  IonAccordion,
  IonHeader,
  IonGrid,
  IonCol,
  IonRow,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonSelectOption,
  IonList,
  IonSelect,
  IonIcon,
  IonSearchbar,
  IonTitle,
  IonNote,
  IonContent,
  IonItem,
  IonLabel,
  IonAvatar,
  IonBadge,
  IonThumbnail,
  IonMenu,
  IonButtons,
  IonMenuButton,
  IonButton,
  MenuController,
  AlertController,
} from '@ionic/angular/standalone';
import {
  ellipsisHorizontalOutline,
  homeOutline,
  pencilOutline,
  notificationsOutline,
  add,
  personAddOutline,
  addCircleOutline,
  addCircle,
  logOutOutline,
  bookmarkOutline,
  shareSocialOutline,
  barChartOutline,
  caretDownCircle,
  bookmark,
  personOutline,
  footballOutline
} from 'ionicons/icons';
import { ExploreContainerComponent } from '../../environments/explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { DataService } from '../services/data.service';
import { AuthserviceService } from '../services/authservice.service';

import { getAuth, signOut } from 'firebase/auth';
import { register } from 'swiper/element/bundle';
import { ActivatedRoute } from '@angular/router';
register();
>>>>>>> 8bdfca4c816053bf7872ae5feaa23a42cc458c84
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
<<<<<<< HEAD
  imports: [IonHeader,IonButton,IonMenu,IonAvatar, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,BaseChartDirective],
  
})

export class Tab1Page {

profile=signal<any>(null);
constructor() {}

@ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef;

  ngAfterViewInit() {
    Chart.register(...registerables);
    
    new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['W', 'L', 'D'],
        datasets: [{
          label: 'My Dataset',
          data: [-5, 6, 3],
          backgroundColor: ['red', 'blue', 'yellow']
        }]
      }
    });
  }

photo(){
const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Base64,
    source: CameraSource.Camera
  });

  // image.webPath will contain a path that can be set as an image src
  const imageUrl =`data:image/jpeg;base64,${image.base64String}`;
  
  // Can be set to the src of an image element
   const profile = signal(imageUrl);
    console.log(profile());
     const imagelement = document.getElementById('myImage') as HTMLImageElement;

     if (imagelement) {
       imagelement.src = imageUrl;
     }
    
};
 
  takePicture()
}

imgPic(){

  console.log('hutgfg');
  const takePicture = async () => {
    try {
      const image = await Camera.pickImages({
        quality: 90,
        limit: 1,
      });

      image.photos.forEach(async (photo, index) => {
        try {
          // Use webPath and convert it to a readable path
          const filePath = photo.webPath;
          
          // Read the file using the webPath
          const file = await Filesystem.readFile({
            path: filePath
          });
          
          console.log('File data:', file.data);
        } catch (fileError) {
          console.error('Error reading file:', fileError);
        }
      });
    } catch (error) {
      console.error('Error picking images:', error);
    }
  };
  takePicture();

}
}
=======
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
     IonAccordionGroup,
  IonAccordion,
    IonHeader,
    IonGrid,
    IonCol,
    IonRow,
    IonSegment,
    IonSegmentButton,
    IonSelectOption,
    IonList,
    IonSelect,
    IonToolbar,
    IonIcon,
    IonSearchbar,
    IonTitle,
    IonNote,
    IonContent,
    ExploreContainerComponent,
    IonItem,
    IonLabel,
    IonAvatar,
    IonBadge,
    IonThumbnail,
    IonMenu,
    IonButtons,
    IonMenuButton,
    IonButton,
  ],
})
export class Tab1Page implements OnInit {
  dataService = inject(DataService);
  router = inject(Router);
  menuCtrl = inject(MenuController);
  alertController = inject(AlertController);
  // user:any
  route = inject(ActivatedRoute);
  Userdata:any;
  authservice = inject(AuthserviceService)
  puser: string=''
  create=signal(false)
  varry:any;
players: any;
clubs: any;


  constructor() {
    this.dataService.get();
    addIcons({ bookmark,footballOutline,personOutline,ellipsisHorizontalOutline,caretDownCircle,barChartOutline,shareSocialOutline,bookmarkOutline,addCircle,personAddOutline,logOutOutline,addCircleOutline, add, notificationsOutline, homeOutline, pencilOutline });
  
  }

  europeBest: any;
  topPlayer: any;
  select: any;
  continents: any;
  footBall: any;

  ngOnInit() {

  this.varry = this.dataService.faveClub()
     this.authservice.getUserProfile();


    this.footBall = this.dataService.teams;
    this.topPlayer = this.dataService.profile;
    this.europeBest = this.dataService.bestProfile;
    this.select = this.dataService.select
    this.continents = this.dataService.continents
    this.puser = this.authservice.statusCheck()
    console.log(this.authservice.puser);
    
  }

  goToDetails(id: string, event: any) {
    event.preventDefault();

    this.router.navigate(['/details',id]);
  }

  goToPlayersInfo(id: string, event: any) {
    event.preventDefault();
    this.router.navigate(['/playersinfo', id]);
  }

  openFirstMenu() {
    this.menuCtrl.open('first-menu');
  }

  logOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });

    this.router.navigate(['/login']);
  }

  async showMultipleInputsAlert() {
    const alert = await this.alertController.create({
      header: 'Multiple Inputs',
      inputs: [
        {
          name: 'firstName',
          placeholder: 'Firstname',
        },
        {
          name: 'surnName',
          placeholder: 'Surnname',
        },
        {
          name: 'bgimg',
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
            console.log(data);
            this.sendData(data.firstName, data.surnName, data.bgimg);
          },
        },
      ],
    });
    await alert.present();
  }
  sendData(firstName: string, surnName: string, bgimg: string) {
    this.dataService.addPlayer(firstName, surnName, bgimg);
  }





}
>>>>>>> 8bdfca4c816053bf7872ae5feaa23a42cc458c84
