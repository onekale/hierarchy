import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PositionService } from './position.service';
import { Position } from './position.entity';
import { CreatePositionDto } from './create-position.dto';

@Controller('path')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  create(@Body() createPositionDto: CreatePositionDto): Promise<Position> {
    return this.positionService.create(createPositionDto);
  }

  @Get()
  findAll(): Promise<Position[]> {
    return this.positionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Position> {
    return this.positionService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatePositionDto: any): Promise<Position> {
    return this.positionService.update(id, updatePositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.positionService.remove(id);
  }
}
