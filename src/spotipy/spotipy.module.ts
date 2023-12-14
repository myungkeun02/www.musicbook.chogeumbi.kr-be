// spotipy/spotipy.module.ts
import { Module } from '@nestjs/common';
import { SpotifyController } from './spotipy.controller';
import { SpotifyService } from './spotipy.service';

@Module({
  controllers: [SpotifyController],
  providers: [SpotifyService],
  exports: [SpotifyService],
})
export class SpotifyModule {}
