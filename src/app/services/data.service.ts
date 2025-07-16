import { effect, inject, Injectable, signal } from '@angular/core';
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
  arrayUnion,
  arrayRemove,
  docData,
  onSnapshot,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular/standalone';
import { AuthserviceService } from './authservice.service';
import { onAuthStateChanged, Auth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  loadingCtrl = inject(LoadingController);
  teams: any[] = [];
  profile: any[] = [];
  bestProfile: any[] = [];
  router = inject(Router);
  db = inject(Firestore);
  favorites: any[] = [];
  authService = inject(AuthserviceService);
  fave = signal<any>([]);
  favoPlay = signal<any>([]);
  dataFavorites: any;
  auth = inject(Auth);

  constructor() {
    // Initialize signals with cached data
    this.loadCachedFavorites();

    effect(() => {
      console.log(this.fave());
      console.log(this.favoPlay());
    });
  }

  dataNames: any = [
    { name: 'epl', docName: this.teams },
    { name: 'players', docName: this.profile },
    { name: 'continentsBest', docName: this.bestProfile },
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

  loadCachedFavorites() {
    try {
      const cachedClubs = localStorage.getItem('favoriteClubs');
      const cachedPlayers = localStorage.getItem('favoritePlayers');

      if (cachedClubs) {
        this.fave.set(JSON.parse(cachedClubs));
      }

      if (cachedPlayers) {
        this.favoPlay.set(JSON.parse(cachedPlayers));
      }
    } catch (error) {
      console.error('Error loading cached favorites:', error);
    }
  }

  saveFavoritesToCache() {
    try {
      localStorage.setItem('favoriteClubs', JSON.stringify(this.fave()));
      localStorage.setItem('favoritePlayers', JSON.stringify(this.favoPlay()));
    } catch (error) {
      console.error('Error saving favorites to cache:', error);
    }
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

  async addFavorites(id: any, p0: string, plac: string) {
    const docRef = doc(this.db, p0, id);

    await setDoc(
      docRef,
      {
        favorites: true,
      },
      { merge: true }
    );
    console.log('Document update: ');
    const clubRef = doc(this.db, 'Users', this.authService.statusCheck().uid);
    await setDoc(
      clubRef,
      {
        ['favorites']: {
          [plac]: arrayUnion(id),
        },
      },
      { merge: true }
    );
  }

  async removeFavorites(id: any, p0: string, plac: string) {
    try {
      console.log('Document update: ');
      plac;
      // Add single favorite
      const clubRef = doc(this.db, 'Users', this.authService.statusCheck().uid);
      await setDoc(
        clubRef,
        {
          ['favorites']: {
            [plac]: arrayRemove(id),
          },
        },
        { merge: true }
      );

      const docRef = doc(this.db, p0, id);
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

  async getFavorite() {
    return new Promise<void>((resolve, reject) => {
      onAuthStateChanged(this.auth, async (user) => {
        if (!user) {
          console.log('No user found');
          resolve();
          return;
        }
       try{
        const userRef = doc(this.db, 'Users', user.uid);

        // Use `onSnapshot` for real-time updates
        const userDoc = await getDoc(userRef)
            if (!userDoc.exists()) {
              resolve();
              return;
            }
            const userData = userDoc.data();
            const favorites = userData?.['favorites'];

            // Process favorite players
            if (favorites.players?.length) {
              const playerPromises = favorites.players.map(
                async (playerId: string) => {
                  const docRef = doc(this.db, 'players', playerId);
                  return new Promise((playerResolve)=>{
                  const unsubscribe = onSnapshot(docRef,(docSnap)=>{
                  const data = docSnap.exists() ? docSnap.data() : null;
                  playerResolve(data)
                  unsubscribe();
                  });
                });
            })
              const players = await Promise.all(playerPromises);
              this.favoPlay.set(players);
            } else {
              this.favoPlay.set([]);
            }

            // Process favorite clubs
            if (favorites.clubs?.length) {
              const clubPromises = favorites.clubs.map(
                async (clubId: string) => {
                  const docRef = doc(this.db, 'epl', clubId);
                return new Promise((clubResolve)=>{
                const unsubscribe = onSnapshot(docRef,(docSnap)=>{
                 const data =docSnap.exists() ? docSnap.data() : null;
                  clubResolve(data)
                  unsubscribe();
                  })
                });
              }
              );
              const clubs = await Promise.all(clubPromises);
             this.fave.set(clubs);
            } else {
              this.fave.set([]);
            }
            // Save to cache after updating
            this.saveFavoritesToCache();
            resolve();
          // },
          }
         catch (error) {
            console.error('Get fave error:', error);
            reject(error);
          }
        // );

      });
    });
  }


async goToFavoritesClub() {
  await this.router.navigate(['favorites'], { 
    state: { showClubs: true }
  });
}
 
async goToFavoritesPlayer() {
  await this.router.navigate(['favorites'], { 
    state: { showPlayers: true }})
}


}
