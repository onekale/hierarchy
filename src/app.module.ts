import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionModule } from './position/position.module';
import { Position } from './position/position.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1332',
      database: 'ORGANIZATION',
      entities: [ Position
      ],
      synchronize: true,
    }),
    PositionModule
  ],
  
})
export class AppModule {}
