import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
<<<<<<< HEAD
=======
  {
    path: 'details/:id',
    loadComponent: () => import('./details/details.page').then( m => m.DetailsPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'playersinfo/:id',
    loadComponent: () => import('./playersinfo/playersinfo.page').then( m => m.PlayersinfoPage)
  },
  {
    path: 'confirmation',
    loadComponent: () => import('./confirmation/confirmation.page').then( m => m.ConfirmationPage)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./favorites/favorites.page').then( m => m.FavoritesPage)
  },
>>>>>>> 8bdfca4c816053bf7872ae5feaa23a42cc458c84
];
