import { inject, Injectable } from '@angular/core';
import { Client as TypesenseClient } from 'typesense';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class TypesenseService {
  client = inject('TypesenseClient' as any) as TypesenseClient;
  dataService = inject(DataService);

  // Updated schema to match your football data structure
  productSchema = {
    name: "football_clubs",
    fields: [
      { name: "id", type: "string" as const },
      { name: "clubName", type: "string" as const },
      { name: "history", type: "string" as const },
      { name: "image", type: "string" as const, optional: true },
      { name: "favorites", type: "bool" as const, optional: true }
    ]
  };

  // Player schema for your players collection
  playerSchema = {
    name: "football_players",
    fields: [
      { name: "id", type: "string" as const },
      { name: "firstName", type: "string" as const },
      { name: "surnName", type: "string" as const },
      { name: "bgimg", type: "string" as const, optional: true },
      { name: "favorites", type: "bool" as const, optional: true }
    ]
  };

  private isInitialized = false;

  constructor() {
    // Don't initialize immediately - wait for data to be ready
    this.delayedInitialization();
  }

  private async delayedInitialization() {
    // Wait a bit for DataService to be ready
    setTimeout(() => {
      this.initializeCollections();
    }, 2000);
  }

  // Debug method to check your data structure
  async debugDataStructure(): Promise<void> {
    try {
      await this.dataService.get();
      
      console.log('=== DATA STRUCTURE DEBUG ===');
      console.log('Teams array length:', this.dataService.teams?.length || 0);
      console.log('First team object:', this.dataService.teams?.[0]);
      console.log('Team object keys:', this.dataService.teams?.[0] ? Object.keys(this.dataService.teams[0]) : 'No teams');
      
      console.log('Players array length:', this.dataService.profile?.length || 0);
      console.log('First player object:', this.dataService.profile?.[0]);
      console.log('Player object keys:', this.dataService.profile?.[0] ? Object.keys(this.dataService.profile[0]) : 'No players');
      
      console.log('=== END DEBUG ===');
    } catch (error) {
      console.error('Error debugging data structure:', error);
    }
  }

  // Method to import your teams array into Typesense
  async importTeamsArray(): Promise<void> {
    try {
      // Wait for data to be loaded first
      await this.dataService.get();
      
      if (!this.dataService.teams || this.dataService.teams.length === 0) {
        console.warn('No teams data available to import');
        return;
      }

      // Debug: Log the raw data structure
      console.log('Raw teams data:', this.dataService.teams.slice(0, 2));

      // Transform your teams data to match the schema
      const transformedTeams = this.dataService.teams
        .filter(item => item && typeof item === 'object') // Filter out null/undefined items
        .map((item, index) => ({
          id: item.id || `team_${index}`,
          clubName: item.clubName || item.name || `Unknown Club ${index}`,
          history: item.history || item.description || '',
          image: item.image || item.img || '',
          favorites: Boolean(item.favorites)
        }))
        .filter(item => item.id && item.clubName); // Ensure required fields exist

      // Debug: Log transformed data
      console.log('Transformed teams data:', transformedTeams.slice(0, 2));
      console.log('Total teams to import:', transformedTeams.length);

      if (transformedTeams.length === 0) {
        console.warn('No valid teams data to import after transformation');
        return;
      }

      // Import the data into Typesense
      const result = await this.client.collections('football_clubs').documents().import(transformedTeams);
      console.log('Teams imported successfully:', result);
    } catch (error) {
      console.error('Error importing teams:', error);
      
      // Check if it's an ImportError and log detailed information
      if (error) {
        console.error('Import results:', error);
        
        // Log first few failed documents for debugging
        // const failedDocs = error.filter((result: { success: any; }) => !result.success);
        // console.error('Failed documents (first 5):', failedDocs.slice(0, 5));
        
        // Log specific errors
        // failedDocs.slice(0, 5).forEach((doc: { error: any; }, index: any) => {
        //   console.error(`Document ${index} error:`, doc.error);
        // });
      }
      
      throw error;
    }
  }

  // Method to import your players array into Typesense
  async importPlayersArray(): Promise<void> {
    try {
      // Wait for data to be loaded first
      await this.dataService.get();
      
      if (!this.dataService.profile || this.dataService.profile.length === 0) {
        console.warn('No players data available to import');
        return;
      }

      // Debug: Log the raw data structure
      console.log('Raw players data:', this.dataService.profile.slice(0, 2));

      // Transform your players data to match the schema
      const transformedPlayers = this.dataService.profile
        .filter(item => item && typeof item === 'object') // Filter out null/undefined items
        .map((item, index) => ({
          id: item.id || `player_${index}`,
          firstName: item.firstName || item.first_name || `Unknown`,
          surnName: item.surnName || item.surname || item.last_name || `Player ${index}`,
          bgimg: item.bgimg || item.image || item.img || '',
          favorites: Boolean(item.favorites)
        }))
        .filter(item => item.id && item.firstName && item.surnName); // Ensure required fields exist

      // Debug: Log transformed data
      console.log('Transformed players data:', transformedPlayers.slice(0, 2));
      console.log('Total players to import:', transformedPlayers.length);

      if (transformedPlayers.length === 0) {
        console.warn('No valid players data to import after transformation');
        return;
      }

      // Import the data into Typesense
      const result = await this.client.collections('football_players').documents().import(transformedPlayers);
      console.log('Players imported successfully:', result);
    } catch (error) {
      console.error('Error importing players:', error);
      
      // Check if it's an ImportError and log detailed information
      if (error) {
        console.error('Import results:', error);
        
        // Log first few failed documents for debugging
        // const failedDocs = error.filter((result: { success: any; }) => !result.success);
        // console.error('Failed documents (first 5):', failedDocs.slice(0, 5));
        
        // Log specific errors
        // failedDocs.slice(0, 5).forEach((doc: { error: any; }, index: any) => {
        //   console.error(`Document ${index} error:`, doc.error);
        // });
      }
      
      throw error;
    }
  }

  async initializeCollections() {
    if (this.isInitialized) return;

    try {
      // Initialize clubs collection
      await this.initializeCollection('football_clubs', this.productSchema);
      
      // Initialize players collection
      await this.initializeCollection('football_players', this.playerSchema);
      
      this.isInitialized = true;
      
      // Add a small delay to ensure collections are ready
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Import data after collections are ready
      await this.importTeamsArray();
      await this.importPlayersArray();
      
    } catch (error) {
      console.error('Error initializing collections:', error);
      this.isInitialized = false; // Reset flag on error
    }
  }

  private async initializeCollection(collectionName: string, schema: any) {
    try {
      // Check if collection exists
      const existingCollection = await this.client.collections(collectionName).retrieve();
      console.log(`Collection ${collectionName} already exists:`, existingCollection);
      
      // Optionally delete and recreate if schema has changed
      // await this.client.collections(collectionName).delete();
      // await this.client.collections().create(schema);
      // console.log(`Collection ${collectionName} recreated`);
      
    } catch (error) {
      // Collection doesn't exist, create it
      if (error === 404) {
        try {
          const newCollection = await this.client.collections().create(schema);
          console.log(`Collection ${collectionName} created successfully:`, newCollection);
        } catch (createError) {
          console.error(`Error creating collection ${collectionName}:`, createError);
          throw createError;
        }
      } else {
        console.error(`Error checking collection ${collectionName}:`, error);
        throw error;
      }
    }
  }

  // Search clubs
  async searchClubs(query: string): Promise<any> {
    try {
      const searchParameters = {
        q: query,
        query_by: 'clubName,history',
        filter_by: '',
        sort_by: '_text_match:desc',
        per_page: 10
      };

      const results = await this.client.collections('football_clubs').documents().search(searchParameters);
      console.log('Club search results:', results.hits);
      return results.hits;
    } catch (error) {
      console.error('Club search error:', error);
      throw error;
    }
  }

  // Search players
  async searchPlayers(query: string): Promise<any> {
    try {
      const searchParameters = {
        q: query,
        query_by: 'firstName,surnName',
        filter_by: '',
        sort_by: '_text_match:desc',
        per_page: 10
      };

      const results = await this.client.collections('football_players').documents().search(searchParameters);
      console.log('Player search results:', results.hits);
      return results.hits;
    } catch (error) {
      console.error('Player search error:', error);
      throw error;
    }
  }

  // Generic search method (searches both collections)
  async search(query: string): Promise<{ clubs: any[], players: any[] }> {
    try {
      const [clubResults, playerResults] = await Promise.all([
        this.searchClubs(query),
        this.searchPlayers(query)
      ]);

      return {
        clubs: clubResults,
        players: playerResults
      };
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }

  // Method to add a new club document
  async addClub(clubData: any): Promise<void> {
    try {
      await this.client.collections('football_clubs').documents().create(clubData);
      console.log('Club added to search index');
    } catch (error) {
      console.error('Error adding club to search index:', error);
    }
  }

  // Method to add a new player document
  async addPlayer(playerData: any): Promise<void> {
    try {
      await this.client.collections('football_players').documents().create(playerData);
      console.log('Player added to search index');
    } catch (error) {
      console.error('Error adding player to search index:', error);
    }
  }

  // Method to update a club document
  async updateClub(id: string, clubData: any): Promise<void> {
    try {
      await this.client.collections('football_clubs').documents(id).update(clubData);
      console.log('Club updated in search index');
    } catch (error) {
      console.error('Error updating club in search index:', error);
    }
  }

  // Method to update a player document
  async updatePlayer(id: string, playerData: any): Promise<void> {
    try {
      await this.client.collections('football_players').documents(id).update(playerData);
      console.log('Player updated in search index');
    } catch (error) {
      console.error('Error updating player in search index:', error);
    }
  }

  // Method to delete a club document
  async deleteClub(id: string): Promise<void> {
    try {
      await this.client.collections('football_clubs').documents(id).delete();
      console.log('Club deleted from search index');
    } catch (error) {
      console.error('Error deleting club from search index:', error);
    }
  }

  // Method to delete a player document
  async deletePlayer(id: string): Promise<void> {
    try {
      await this.client.collections('football_players').documents(id).delete();
      console.log('Player deleted from search index');
    } catch (error) {
      console.error('Error deleting player from search index:', error);
    }
  }

  // Method to get search suggestions
  async getSearchSuggestions(query: string): Promise<string[]> {
    try {
      const [clubResults, playerResults] = await Promise.all([
        this.client.collections('football_clubs').documents().search({
          q: query,
          query_by: 'clubName',
          per_page: 5
        }),
        this.client.collections('football_players').documents().search({
          q: query,
          query_by: 'firstName,surnName',
          per_page: 5
        })
      ]);

      const suggestions: string[] = [];
      
      clubResults.hits?.forEach((hit: any) => {
        suggestions.push(hit.document.clubName);
      });
      
      playerResults.hits?.forEach((hit: any) => {
        suggestions.push(`${hit.document.firstName} ${hit.document.surnName}`);
      });

      return [...new Set(suggestions)]; // Remove duplicates
    } catch (error) {
      console.error('Error getting search suggestions:', error);
      return [];
    }
  }
}