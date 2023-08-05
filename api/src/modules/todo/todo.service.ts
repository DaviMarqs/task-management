import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createTodoDto: CreateTodoDto) {
    return await this.prismaService.todo.create({
      data: createTodoDto,
    });
  }

  findAll() {
    return this.prismaService.todo.findMany();
  }

  findOne(id: string) {
    return this.prismaService.todo.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.prismaService.todo.update({
      where: {
        id: id,
      },
      data: updateTodoDto,
    });
  }

  remove(id: string) {
    return this.prismaService.todo.delete({
      where: {
        id: id,
      },
    });
  }
}
