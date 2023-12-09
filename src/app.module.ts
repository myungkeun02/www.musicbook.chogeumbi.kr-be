import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicController } from './music/music.controller';
import { MusicModule } from './music/music.module';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Music } from './entities/music.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Admin, Music, Category],
      synchronize: true,
    }),
    MusicModule,
    AdminModule,
    CategoryModule,
  ],
  controllers: [
    AppController,
    MusicController,
    AdminController,
    CategoryController,
  ],
  providers: [AppService],
})
export class AppModule {}
