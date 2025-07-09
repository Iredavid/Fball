import { effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { LoadingController } from '@ionic/angular/standalone';
import { AlertserviceService } from './alertservice.service';


@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  router = inject(Router);
  loadingCtrl = inject(LoadingController);
  alertservice = inject(AlertserviceService);

  formData: any;
  userProfile: any;
  puser: any;
  statusCheck = signal<any>('');
  constructor() {
    effect(() => {
          console.log(this.statusCheck());
    })
  }

  async authFunc(value: any) {
    console.log(value.name);

    const loading = await this.loadingCtrl.create({
      message: 'Signing up...',
      spinner: 'crescent',
    });

    await loading.present();

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, value.email, value.password)
      .then(async (userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        console.log(user);

        await updateProfile(user, {
          displayName: value.name,
          photoURL: 'https://example.com/jane-q-user/profile.jpg',
        });

        await sendEmailVerification(user).then(() => {
          this.alertservice.showAlert('Email', 'Email Verification sent');
        });

        this.router.navigate(['confirmation']);
        await loading.dismiss();
        return user;
      })

      .catch(async (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        await loading.dismiss();
        this.alertservice.showErrorAlert(errorMessage);
      });
  }

  async confirm() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      await user.reload();
      if (user.emailVerified) {
        this.alertservice.showAlert('Email', 'Email  verified');
       
        
      } else {
        console.log('Email not verified yet');
        this.alertservice.showAlert(
          'Email',
          'Please verify your email before continuing'
        );
      }
    } else {
      console.log('No user found');
      this.alertservice.showErrorAlert('No user found');
    }
  }

  async logIn(email: string = '', password: string = '') {
    const loading = await this.loadingCtrl.create({
      message: 'Logging in...',
      spinner: 'crescent',
    });
    await loading.present();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user.emailVerified);
        await loading.dismiss();
        if (user.emailVerified) {
          this.router.navigate(['tabs/tab1']);
        } else {
          console.log('email not verified');
        }
      })

      .catch(async (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        await loading.dismiss();
        this.alertservice.showErrorAlert(errorMessage);
      });
  }

  async getUserProfile() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        this.puser = user;
        this.statusCheck.set(user);

        const uid = user.uid;
        return this.puser;
      } else {
        console.log('uhrgh');
      }
    });
  }
}
