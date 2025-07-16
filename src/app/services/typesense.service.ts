import { inject, Injectable } from '@angular/core';
import Typesense from 'typesense';
@Injectable({
  providedIn: 'root',
})
export class TypesenseService {
  client = inject(Typesense.Client);
  constructor() {
    this.client = new Typesense.Client({
      nodes: [
        {
          host: 'localhost', // Replace with your Typesense server
          port: 8100,
          protocol: 'http',
        },
      ],
      apiKey: 'your-search-api-key', // Replace with your API key
      connectionTimeoutSeconds: 2,
    });
  }
}
