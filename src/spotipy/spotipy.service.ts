// spotipy/spotipy.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class SpotifyService {
  private readonly clientId = process.env.SPOTIFY_CLIENT_ID;
  private readonly clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  private readonly apiUrl = process.env.SPOTIFY_API_URL;

  async searchTracks(query: string): Promise<any[]> {
    const accessToken = await this.getAccessToken();

    const searchResponse = await axios.get(`${this.apiUrl}/search`, {
      params: {
        q: query,
        type: 'track',
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const tracks = searchResponse.data.tracks.items;

    if (tracks.length === 0) {
      return null; // No tracks found
    }

    return tracks.map((track) => ({
      title: track.name,
      artist: track.artists.map((artist) => artist.name).join(', '),
      album_art:
        track.album.images.length > 0 ? track.album.images[0].url : null,
    }));
  }

  async getAccessToken(): Promise<string> {
    const authResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      `grant_type=client_credentials`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: this.clientId,
          password: this.clientSecret,
        },
      },
    );

    return authResponse.data.access_token;
  }
}
