import { inject, Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  arrayUnion,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular/standalone';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  userProfile: any[] = [];
  loadingCtrl = inject(LoadingController);
  teams: any[] = [];
  profile: any[] = [];
  bestProfile: any[] = [];
  router = inject(Router);
  db = inject(Firestore);
  formData: any;
  authService = inject(AuthserviceService);

  constructor() { }

  dataNames: any = [
    { name: 'epl', docName: this.teams },
    { name: 'players', docName: this.profile },
    { name: 'continentsBest', docName: this.bestProfile },
    { name: 'Users', docName: this.userProfile },
  ];

  async get() {
    // Use Promise.all to handle async operations properly
    const results = await Promise.all(
      this.dataNames.map(async (item: { name: string; docName: any[] }) => {
        let dataRef = collection(this.db, item.name); // Use item.name, not this.dataNames.name

        try {
          const querySnapshot = await getDocs(dataRef);
          querySnapshot.forEach((doc: any) => {
            item.docName.push(doc.data()); // Push to the local data array
          });
          return item.docName;
        } catch (error) {
          console.log(`Error fetching ${item.name}:`, error);
          return { name: item.name, data: [] };
        }
      })
    );

    return results;
  }

  continents: any = [
    { name: 'EUROPEAN' },
    { name: 'ASIAN' },
    { name: 'AFRICA' },
    { name: 'OCEANIAN' },
    { name: 'SOUTH AMERICAN' },
  ];

  select: any = [
    { name: 'PREMIER LEAGUE', img: 'assets/pl.jpeg' },

    {
      name: 'BUNDESLIGA',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGbO4SfDbEpGSdMkCIo6ycGCe-f1snjVtIuZHqS2yOBrHOUTeOxqQhdT9Y_8sLdkrRJNo&usqp=CAU',
    },
    { name: 'PRIMERA LIGA', img: 'assets/bl.jpeg' },
    { name: 'SERIE A', img: 'assets/lige.png' },
    { name: 'LALIGA', img: 'assets/italy.jpeg' },
    {
      name: 'LIGUE 1',
      img: 'https://i.pinimg.com/736x/e5/3c/58/e53c58f92500ab42db1b9f79f15397fd.jpg',
    },
  ];

  // async getUsersById(id: string) {
  //   const dataRef = doc(this.db, `Users/${id}`);
  //   const UserDoc = await getDoc(dataRef);
  //   console.log(UserDoc.exists());
  //   if (!UserDoc.exists()) {
  //     return;
  //   }
  //   return UserDoc.data();
  // }

  async getItemById(id: string) {
    const dataRef = doc(this.db, `epl/${id}`);
    const playerDoc = await getDoc(dataRef);
    console.log(playerDoc.exists());
    if (!playerDoc.exists()) {
      return;
    }
    return playerDoc.data();
  }

  async getPlayerById(id: string) {
    const dataRef = doc(this.db, `players/${id}`);
    const playerDoc = await getDoc(dataRef);
    console.log(playerDoc.exists());
    if (!playerDoc.exists()) {
      return;
    }
    return playerDoc.data();
  }

  async addClub() {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(this.db, 'epl'), {
      clubName: 'Sunderland AFC',
      history:
        'Manchester United is one of the most successful and globally recognized football clubs, based in Manchester, England. Founded in 1878 (originally as Newton Heath), the club has a rich history, especially under legendary manager Sir Alex Ferguson, who led them to domestic and international dominance.',
      image:
        'https://loodibee.com/wp-content/uploads/Sunderland-logo-300x300.png',
    });
    await updateDoc(docRef, { id: docRef.id });
    console.log('Document written with ID: ', docRef.id);
  }

  async addEuropeBest() {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(this.db, 'continentsBest'), {
      firstName: 'Ousemane',
      surnName: 'Dembele',
      img: '',
    });
    await updateDoc(docRef, {
      id: docRef.id,
      img: '',
    });
    console.log('Document written with ID: ', docRef.id);
  }

  tryName: string = '';

  async addUser() {
    const loading = await this.loadingCtrl.create({
      message: 'Saving Credentials...',
      spinner: 'crescent',
    });
    await loading.present();
    const docRef = doc(collection(this.db, 'Users'));

    await setDoc(doc(this.db, 'Users', this.authService.statusCheck().uid), {
      id: this.authService.statusCheck().uid,
      UserName: this.authService.statusCheck().displayName,
    });
    console.log('Document written with ID: ', docRef.id);
    this.router.navigate(['/tabs/tab1']);
    await loading.dismiss();
  }

  async clubDelete(id: any) {
    await deleteDoc(doc(this.db, 'epl', id));
    console.log('guiiiiiiiirf');

    this.router.navigate(['/tabs/tab1']);
  }

  async addPlayer(firstName: string, surnName: string, bgimg: string) {
    const docRef = doc(collection(this.db, 'players'));
    const objId = docRef.id;
    await setDoc(doc(this.db, 'players', objId), {
      id: objId,
      bgimg: bgimg,
      firstName: firstName,
      surnName: surnName,
    });
    console.log('Document written with ID: ', docRef.id);
  }

  firstName: string = '';
  surnName: string = '';
  img: string = '';

  async updateTopPlayer(id: string) {
    const docRef = doc(this.db, 'players', id);

    await setDoc(
      docRef,
      {
        firstName: this.firstName,
        surnName: this.surnName,
        bgimg: this.img,
      },
      { merge: true }
    );
    console.log('Document update: ');
  }

  async deleteTopPlayer(id: string) {
    await deleteDoc(doc(this.db, 'players', id));
    console.log('guiiiiiiiirf');

    this.router.navigate(['/tabs/tab1']);
  }

  async addFavorites(id: any) {
    const docRef = doc(this.db, 'epl', id);

    await setDoc(
      docRef,
      {
        favorites: true,
      },
      { merge: true }
    );
    console.log('Document update: ');
    // Add single favorite
    const clubRef = doc(this.db, 'Users', this.authService.statusCheck().uid);
    await setDoc(
      clubRef,
      {
      'favorites.clubs': arrayUnion(id)
      
      },
      { merge: true }
    );
  }

  async removeFavorites(id: any) {
    try {
      // Remove from user's favorites
      const clubRef = doc(this.db, 'Users', this.authService.statusCheck().uid);
      console.log(id);

      await setDoc(clubRef, {
        [`favorites.clubs.${id}`]: deleteField()
      }, { merge: true });

      // Optional: Update club document to mark as not favorited
      const docRef = doc(this.db, 'epl', id);
      await setDoc(
        docRef,
        {
          favorites: false,
        },
        { merge: true }
      );

      console.log('Removed from favorites successfully');
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  }


  async getFavoriteClub() {
    const userRef = doc(
      this.db,
      'Users',
      `${this.authService.statusCheck().uid}`
    );
    const userDoc = await getDoc(userRef);
    console.log(userDoc);

    const userData = userDoc.data()
    console.log(userData);
    const favoritePlayers = userData?.['favorites'].players;
    const favoriteClubs = userData?.['favorites.clubs'];
    console.log(favoritePlayers);
    console.log(favoriteClubs);
    
for(const me in favoriteClubs){
  console.log(favoriteClubs[me]);
  
}
// for(const we in favoritePlayers){
//   console.log(favoritePlayers[we]);
  
// }

  
    // for () {
    //   console.log();

    // }

    // const favorites = user?.['favorites.clubs.DkPaF0bVDoJOXTp34sbY'];
    // console.log(favorites);

    // const clubs = favorites.clubs;

    // await this.getItemById(clubs);
  }

}

//   goToUsersDoc(id: string) {
//     this.router.navigate(['tabs/tab1', id]);
//   }
