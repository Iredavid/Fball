<<<<<<< HEAD
import { inject, Injectable } from '@angular/core';
import { Firestore,getDoc, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, } from '@angular/fire/firestore';
import { football } from 'ionicons/icons';
 
@Injectable({
  providedIn: 'root'
})
export class DataService {
db = inject(Firestore)
footballClub:any = []
  constructor() { }

    
      // {
      //   name: "Manchester United",
      //   image: "assets/shapes.svg",
      //   year: "EST. 1878",
      //   desc: "THE RED DEVILS",
      //   id: "1",
      //   bgImage: "assets/manu-trophies.jpeg", 
      //   notable:"Manchester United is one of the most successful and globally recognized football clubs, based in Manchester, England. Founded in 1878 (originally as Newton Heath), the club has a rich history, especially under legendary manager Sir Alex Ferguson, who led them to domestic and international dominance."
    
      // },

      
      // {
      //   name: "Liverpool Football Club",
      //   image:"assets/liverpool.jpeg",
      //   year:"EST. 1892",
      //   desc:"THE REDS",
      //   id: "3",
      //   bgImage: "assets/ynwa.jpeg", 
      //   notable: "An iconic part of Liverpool’s identity is the anthem You'll Never Walk Alone, sung by fans before every home game at Anfield. The chant symbolizes unity, resilience, and unwavering support, making it one of the most emotional and famous traditions in world football"

      //   ,
    
    
      // },
    
      // {
      //   name: "Manchester City",
      //   image:"assets/ManchesterCity.jpeg",
      //   year:"EST. 1880",
      //   desc:"THE CITIZENS",
      //   id: "4",
      //   bgImage: "assets/mancityepl.jpeg", 
      //   notable:"Their recent dominance under manager Pep Guardiola has redefined English football, with a tactical, possession-based style and record-breaking seasons—cementing their status as a modern powerhouse." 
    
      // },
    
      // {
      //   name: "Arsenal",
      //   image:"assets/arsenal.jpeg",
      //   year:"EST. 1886",
      //   desc:"THE GOONERS",
      //   id: "5",
      //   bgImage: "assets/arsenalinvincibles.jpeg",
      //   notable:"Arsenal Football Club based in North London. One of their most iconic achievements came during the 2003–04 Premier League season,when they went unbeaten throughout the entire league campaign—a feat dubbed “The Invincibles”. Led by manager Arsène Wenger and stars like Thierry Henry, Arsenal became the first team in over a century to complete a top-flight English season without a single defeat, finishing with 26 wins and 12 draws." 
        
    
    
      // },
    
      // {
      //   name: "Leicester City Football Club",
      //   image:"assets/LeicesterCity.jpeg",
      //   year:"EST. 1884",
      //   desc:"THE FOXES",
      //   id: "6",
      //   bgImage: "assets/jamievardy.jpeg", 
      //   notable:"Leicester is a city in the East Midlands of England known for its rich history, diverse culture, and strong sporting traditions. It's famously home to Leicester City Football Club, which made global headlines in 2016 by winning the Premier League against 5000-to-1 odds—a historic underdog triumph that stunned the football world and became one of the greatest sporting stories of all time."
    
    
      // },{
      //   name: "Tottenham Hotspur",
      //   image:"assets/tottenham.jpeg",
      //   year:"EST. 1882",
      //   desc:"SPURS",
      //   id: "7",
      //   bgImage: "assets/facuptrophy.jpeg", 
      //   notable:"Tottenham is a major football club based in North London, known for its attacking style and passionate fanbase. Founded in 1882, Tottenham Hotspur made history in 1901 by becoming the first non-League club to win the FA Cup, a feat that marked the beginning of their rise in English football."
  
      // },
      // {
      //   name: "Newcastle United",
      //   image:"assets/newcastle.jpeg",
      //   year:"EST. 1892",
      //   desc:"THE MAGPIES",
      //   id: "8",
      //   bgImage: "assets/newcastlealanshearer.jpeg", 
      //   notable:"Newcastle is a historic football club based in the northeast of England, known for its loyal fanbase and iconic black-and-white kits. The club's most legendary figure is Alan Shearer, a record-breaking striker who became the Premier League’s all-time top scorer and a symbol of pride for both the team and the city."
    
      // },
      // {
      //   name: "Everton",
      //   image:"assets/Everton.jpeg",
      //   year:"EST. 1878",
      //   desc:"THE BLACK WATCH",
      //   id: "9",
      //   bgImage: "assets/evertonfans.jpeg", 
      //   notable:"Everton is a historic football club based in Liverpool, known for its deep roots in English football and passionate fanbase. Nicknamed The Toffees,the club has a rich tradition and strong community ties, with fans renowned for their loyalty and unwavering support through highs and lows."

      // },
      // {
      //   name: "Aston Villa",
      //   image:"assets/astonvilla.jpeg",
      //   year:"EST. 1874",
      //   desc:"LIONS",
      //   id: "10",
      //   bgImage: "assets/astonvillaoldstadium.jpeg", 
      //   notable:"As one of the oldest clubs in the Premier League, Aston Villa carries deep tradition and pride, playing at their historic home ground, Villa Park, with a strong emphasis on heritage and passionate support."
        
    
      // },
    
    

  async getFot(){

    const querySnapshot = await getDocs(collection(this.db, "epl"));
querySnapshot.forEach((doc) => {
 this.footballClub.push(doc.data())
  console.log(doc.id, " => ", doc.data());
   console.log(this.footballClub);
  return this.footballClub
 
  
});


=======
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
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular/standalone';
import { AuthserviceService } from './authservice.service';
import { onAuthStateChanged, getAuth } from '@angular/fire/auth';

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
  favorites: any[] = [];
  authService = inject(AuthserviceService);
  fave = signal<any[]>([]);
  faveClub = signal(false);
  favoPlay = signal<any[]>([]);
  dataFavorites: any;

  constructor() {
    effect(() => {
      console.log(this.fave());
      console.log(this.faveClub());
      console.log(this.favoPlay());
    });
  }

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

  async addFavorites(id: any, p0: string,plac:string) {
    const docRef = doc(this.db, p0, id);

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
        ['favorites']: {
          [plac]: arrayUnion(id),
        },
      },
      { merge: true }
    );
  }

  async removeFavorites(id: any, p0: string, plac:string) {
    try {
      console.log('Document update: ');
      plac
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

      // Optional: Update club document to mark as not favorited
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


  
  async getFavorite(): Promise<any[]> {
    const auth = getAuth();

    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const userRef = doc(this.db, 'Users', `${user.uid}`);
            const userDoc = await getDoc(userRef);
            const userData = userDoc.data();
            const favoritePlayers = userData?.['favorites']?.players || [];
            const favoriteClubs = userData?.['favorites']?.clubs || [];

            const dataFavorites = [
              {
                locate: favoritePlayers,
                coll: 'players',
                arr: this.favoPlay,
              },
              { locate: favoriteClubs, coll: 'epl', arr: this.fave },
            ];
            const favData = await Promise.all(
              dataFavorites.map(async (elementde: any) => {
                const clubPromises = elementde.locate.map(
                  async (element: any) => {
                    console.log(element);
                    const docRef = doc(this.db, elementde.coll, element);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                      console.log('Document exists');
                      return docSnap.data();
                    } else {
                      console.log('No such document!');
                      return null;
                    }
                  }
                );
                const clubsData = await Promise.all(clubPromises);
                elementde.arr.set(clubsData);
                console.log('All favorite clubs loaded:', elementde.arr());
                return clubsData;
              })
            );
            resolve(favData);
          } catch (error) {
            console.error('Error fetching favorite clubs:', error);
            return [];
          }
        } else {
          console.log('No user found');
        }
        return;
      });
    });
  }


  async goToFavoritesClub() {
    this.faveClub.set(true);
    await this.router.navigate(['favorites']);
    console.log(this.faveClub());
    this.getFavorite();
  }



  async goToFavoritesPlayer() {
    this.faveClub.set(false);
    await this.router.navigate(['favorites']);
    console.log(this.favoPlay());
    this.getFavorite();
>>>>>>> 8bdfca4c816053bf7872ae5feaa23a42cc458c84
  }
}
