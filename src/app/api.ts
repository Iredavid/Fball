export interface League {
   response:{
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
   }
}

export interface Team {
  response:{
  id: number;
  name: string;
  logo: string;
  founded: number;
  country: string;
  }
}

