import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailValidator, FormsModule } from '@angular/forms';
import {
  IonActionSheet,
  ModalController,
  IonModal,
  IonContent,
  IonNote,
  IonSegmentView,
  IonSegmentContent,
  IonSegment,
  IonLabel,
  IonSegmentButton,
  IonIcon,
  IonInput,
  IonAvatar,
  IonButton,
  IonButtons,
  IonItem,
  IonList,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';
import { addIcons } from 'ionicons';
import {
  lockClosedOutline,
  images,
  personOutline,
  mailOutline,
  cameraOutline,
  camera,
} from 'ionicons/icons';
import { AuthserviceService } from '../services/authservice.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonActionSheet,
    IonModal,
    ReactiveFormsModule,
    IonContent,
    IonNote,
    IonSegment,
    IonSegmentContent,
    IonSegmentView,
    IonLabel,
    IonSegmentButton,
    IonIcon,
    IonInput,
    IonAvatar,
    IonButton,
    IonButtons,
    IonItem,
    IonList,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class LoginPage implements OnInit {
  dataService = inject(DataService);
  authservice = inject(AuthserviceService);
  router = inject(Router);
  formData = signal<any>(null);
  modalCtrl = inject(ModalController);
  myForm: FormGroup;
  signForm: FormGroup;
  email!: EmailValidator;

  constructor(private fb: FormBuilder) {
    addIcons({
      camera,
      mailOutline,
      images,
      lockClosedOutline,
      personOutline,
      cameraOutline,
    });
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.signForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log('Form submitted:', this.myForm.value);
      this.authservice.logIn(
        this.myForm.value.email,
        this.myForm.value.password
      );
    }
  }

  signUp() {
    console.log('Form submitted:', this.signForm.value);
    let formData = this.signForm.value;
    console.log(formData);
    this.authservice.formData = formData;
    this.authservice.userProfile = this.authservice.authFunc(
      this.signForm.value
    );
  }

  ngOnInit() {}

  segmentValue = 'info'; // Default segment

  segmentChanged(event: any) {
    this.segmentValue = event.detail.value;
  }

  actionSheetButtons = [
    {
      text: 'Take Photo',
      icon: 'camera',
      handler: () => {
        this.photo();
      },
    },
    {
      text: 'Upload Photo',
      icon: 'images',
      handler: () => {
        this.uploadPhoto();
      },
    },
  ];

  uploadPhoto() {
    console.log('hutgfg');
    const takePicture = async () => {
      try {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Base64,
          source: CameraSource.Photos,
        });

        // Base64 data is directly available
        console.log('Base64 data:', image.base64String);

        // You can create a data URL like this:
        const dataUrl = `data:image/jpeg;base64,${image.base64String}`;
        console.log('Data URL:', dataUrl);
           const imgElement =document.getElementById('myImg') as HTMLImageElement
    imgElement.src= dataUrl
      } catch (error) {
        console.error('Error picking image:', error);
      }
      
    };

    takePicture();
 
  }

  photo() {
    const takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      // image.webPath will contain a path that can be set as an image src
      const imageUrl = image.webPath;

      // Can be set to the src of an image element
      const profile = signal(imageUrl);
      console.log(profile());
    };

    takePicture();
  }
}
