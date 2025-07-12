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


  }
}
