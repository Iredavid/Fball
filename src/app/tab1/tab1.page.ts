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
  IonBackButton,
   ModalController 
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
  footballOutline,
  arrowBackOutline,
} from 'ionicons/icons';
import { ExploreContainerComponent } from '../../environments/explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { DataService } from '../services/data.service';
import { AuthserviceService } from '../services/authservice.service';

import { getAuth, signOut } from 'firebase/auth';
import { register } from 'swiper/element/bundle';
import { ActivatedRoute } from '@angular/router';
import { TypesenseService } from '../services/typesense.service';
import { FormsModule } from '@angular/forms';
register();
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
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
    FormsModule,
    IonBackButton,
    IonButtons,
  ],
})
export class Tab1Page implements OnInit {
  typeService = inject(TypesenseService)
  dataService = inject(DataService);
  router = inject(Router);
  menuCtrl = inject(MenuController);
  alertController = inject(AlertController);
  route = inject(ActivatedRoute);
  Userdata: any;
  authservice = inject(AuthserviceService);
  puser: string = '';
  create = signal(false);
  varry: any;
  players: any;
  clubs: any;
  searchv='';
  modalCtrl=inject(ModalController);
  selectedCont: any;
  selectedLeague: any;

  constructor() {
    this.dataService.get();
    addIcons({
      bookmark,
      footballOutline,
      personOutline,
      ellipsisHorizontalOutline,
      caretDownCircle,
      barChartOutline,
      shareSocialOutline,
      bookmarkOutline,
      addCircle,
      personAddOutline,
      logOutOutline,
      addCircleOutline,
      add,
      notificationsOutline,
      homeOutline,
      pencilOutline,
      arrowBackOutline,
    });
  }

  europeBest: any;
  topPlayer: any;
  select: any;
  continents: any;
  footBall: any;

  ngOnInit() {
    this.authservice.getUserProfile();

    this.footBall = this.dataService.teams;
    this.topPlayer = this.dataService.profile;
    this.europeBest = this.dataService.bestProfile;
    this.select = this.dataService.select;
    this.continents = this.dataService.continents;
    this.puser = this.authservice.statusCheck();
    console.log(this.authservice.puser);
    console.log(this.dataService.teams);
    
  }



  goToDetails(id: string, event: any) {
    event.preventDefault();

    this.router.navigate(['/details', id]);
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
  search(pam:string){
    console.log(pam);
    
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
onCont(){
  this.dataService.getAllAreas(this.selectedCont)
}

onSelect(){

  console.log(this.selectedLeague);
  this.dataService.getTeamsByLeagueAndSeason(this.selectedLeague)
  
}

}
