import {
  effect,
  inject,
  Injectable,
  Injector,
  NgZone,
  runInInjectionContext,
  signal,
} from '@angular/core';
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
  onSnapshot,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular/standalone';
import { AuthserviceService } from './authservice.service';
import { onAuthStateChanged, Auth } from '@angular/fire/auth';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Team, League } from '../api';
import { Observable, observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  injector = inject(Injector);
  ngZone = inject(NgZone);
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
  http = inject(HttpClient);
  apiHost: string = ' free-api-live-football-data.p.rapidapi.com';
  apiKey: string = '70039f9926msh4a8d4e44bcd3d67p13ce37jsn8882e061585a';
  apiUrl: string = 'https://free-api-live-football-data.p.rapidapi.com/';
  select : any[] = []
  constructor() {
    this.loadCachedFavorites();
    effect(() => {
      console.log(this.fave());
      console.log(this.favoPlay());
    });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      // 'X-RapidAPI-Host': this.apiHost,
      'x-rapidapi-host': 'livescore6.p.rapidapi.com' 
    });
  }

  getLiveMatches() {
    const headers = this.getHeaders();
    this.http
      .get<any>(
         'https://livescore6.p.rapidapi.com/leagues/v2/list-popular?Category=soccer' ,
        // 'https://free-api-live-football-data.p.rapidapi.com/football-get-list-all-team?leagueid=47',
        { headers }
      )
      .subscribe((rec) => {
        console.log(rec);
        // const results = rec.response.list;
        // results.forEach((ele: any) => {
        //   this.teams.push(ele);
        // });
        // console.log(this.teams);
      });
  }

  getCountries() {
    const headers = this.getHeaders();
    this.http
      .get<any>(
        'https://free-api-live-football-data.p.rapidapi.com/football-get-all-leagues',
        { headers }
      )
      .subscribe((sul) => {
        console.log(sul);
      });
  }

  // Football-Data.org API - Get Leagues by Continent
  // Sign up at https://www.football-data.org/ for free API key

  // const API_KEY = 'YOUR_API_KEY';
  // const BASE_URL = 'https://api.football-data.org/v4';

  // const headers = {
  //   'X-Auth-Token': this.API_KEY
  // };

 // this.http.get<any>('/api/competitions/PL').subscribe((sul) => {
      //   console.log(sul);
      // });
  // Get all areas (continents and countries)




  // async getAllAreas() {
  //   try {
     
  //     const response = await fetch('/api/competitions/PL/matches?matchday=11');
  //     const data =  response;
  //     console.log(data);
  //   } catch (error) {
  //     console.error('Error fetching areas:', error);
  //   }
  // }

  dataNames: any = [
    // { name: 'epl', docName: this.teams },
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

async getAllAreas(id:string) {
  try {
    const response = await fetch(`/api/competitions?areas=${id}`);
    const data = await response.json();
    console.log(data.competitions);
     const res = data.competitions
     res.forEach((el: any)=>{this.select.push(el)})
     return this.select
  } catch (error) {
    console.error('Error fetching areas:', error);
    throw error;
  }
}
  continents: any = [
  { id: 2077, name: "Europe", code: "EUR" },
  { id: 2076, name: "South America", code: "SAM" },
  { id: 2079, name: "North America", code: "NAM" },
  { id: 2078, name: "Asia", code: "ASI" },
  { id: 2081, name: "Africa", code: "AFR" },
  { id: 2080, name: "Oceania", code: "OCE" }
 
  ];


// Method 3: Get teams with season filter
async getTeamsByLeagueAndSeason(competitionId: any, season = '2024') {
  try {
    const response = await fetch(`/api/competitions/${competitionId}/teams?season=${season}`);
    const data = await response.json();
    return data.teams;
  } catch (error) {
    console.error(`Error fetching teams for league ${competitionId} season ${season}:`, error);
    return [];
  }
}




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
      runInInjectionContext(this.injector, () => {
        this.ngZone.run(() => {
          onAuthStateChanged(this.auth, async (user) => {
            if (!user) {
              console.log('No user found');
              resolve();
              return;
            }
            try {
              const userRef = doc(this.db, 'Users', user.uid);

              // Use `onSnapshot` for real-time updates
              const userDoc = await getDoc(userRef);
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
                    return new Promise((playerResolve) => {
                      const unsubscribe = onSnapshot(docRef, (docSnap) => {
                        const data = docSnap.exists() ? docSnap.data() : null;
                        playerResolve(data);
                        unsubscribe();
                      });
                    });
                  }
                );
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
                    return new Promise((clubResolve) => {
                      const unsubscribe = onSnapshot(docRef, (docSnap) => {
                        const data = docSnap.exists() ? docSnap.data() : null;
                        clubResolve(data);
                        unsubscribe();
                      });
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
            } catch (error) {
              console.error('Get fave error:', error);
              reject(error);
            }
            // );
          });
        });
      });
    });
  }

  async goToFavoritesClub() {
    await this.router.navigate(['favorites'], {
      state: { showClubs: true },
    });
  }

  async goToFavoritesPlayer() {
    await this.router.navigate(['favorites'], {
      state: { showPlayers: true },
    });
  }
}
