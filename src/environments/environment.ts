// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
  apiKey: "AIzaSyAG0lzYCQO-pTm7JoZz1ddWnnmcJou7kLk",
  authDomain: "epl-teams-e1b9e.firebaseapp.com",
  projectId: "epl-teams-e1b9e",
  storageBucket: "epl-teams-e1b9e.firebasestorage.app",
  messagingSenderId: "257301522193",
  appId: "1:257301522193:web:0d7dd5b859f9c4c99c0eb0",
  measurementId: "G-SESG8Y4QV8"
},
  typesense: {
    nodes: [
      {
        host: '5q1yshdi3mg9r06tp.a1.typesense.net',
        port: 443,
        protocol: 'https'
      }
    ],
    apiKey: 'oWc2yeXTTLTgp9DIqXdbLLH57GG4WLfe',
        connectionTimeoutSeconds: 2

  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
