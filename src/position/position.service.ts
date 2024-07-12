 import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
// import { Repository, TreeRepository } from 'typeorm';
// import { Repository as TypeOrmRepository, TreeRepository } from 'typeorm';
import { Position } from './position.entity';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
  ) {}

  async findAllHierarchy(): Promise<Position[]> {
    const positions = await this.positionRepository.find({ relations: ['parent', 'children'] });
    const map = new Map<number, Position>();

    positions.forEach(position => {
      map.set(position.id, { ...position, children: [] });
    });

    const roots: Position[] = [];

    map.forEach(position => {
      if (position.parent) {
        const parent = map.get(position.parent.id);
        if (parent) {
          parent.children.push(position);
        }
      } else {
        roots.push(position);
      }
    });

    return roots;
  }

  create(createPositionDto: any): Promise<Position> {
    const position = new Position();
    position.name = createPositionDto.name;
    position.description = createPositionDto.description;
    position.parent = createPositionDto.parentId ? { id: createPositionDto.parentId } as Position : null;
    return this.positionRepository.save(position);
  }

  findAll(): Promise<Position[]> {
    return this.positionRepository.find({ relations: ['children', 'parent'] });
  }

  findOne(id: number): Promise<Position> {
    const options: FindOneOptions<Position> = { where: { id }, relations: ['children', 'parent'] };
    return this.positionRepository.findOne(options);
    // return this.positionRepository.findOne(id);
  }

  async update(id: number, updatePositionDto: any): Promise<Position> {
    const position = await this.findOne(id);
    position.name = updatePositionDto.name || position.name;
    position.description = updatePositionDto.description || position.description;
    position.parent = updatePositionDto.parentId ? { id: updatePositionDto.parentId } as Position : position.parent;
    return this.positionRepository.save(position);
  }

  async remove(id: number): Promise<void> {
    await this.positionRepository.delete(id);
  }


  // async findHierarchy(): Promise<Position[]> {
  //   return this.treeRepository.findTrees();
  // }
}
