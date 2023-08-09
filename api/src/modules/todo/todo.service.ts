import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSubtaskDto } from './dtos/create-subtask';
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

  async findAll(filter?: string) {
    const filterMapping: Record<string, any> = {
      newest: { orderBy: { created_at: 'desc' } },
      oldest: { orderBy: { created_at: 'asc' } },
      done: { where: { done: true } },
      not_done: { where: { done: false } },
    };

    const filterOptions = filterMapping[filter] || {
      orderBy: { created_at: 'desc' },
    };

    return await this.prismaService.todo.findMany({
      ...filterOptions,
      select: {
        id: true,
        done: true,
        label: true,
        subtasks: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.todo.findUnique({
      where: {
        id: id,
      },
      include: {
        subtasks: true,
      },
    });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    return await this.prismaService.todo.update({
      where: {
        id: id,
      },
      data: updateTodoDto,
    });
  }
  async markTodoAsDone(id: string) {
    const todo = await this.prismaService.todo.findUnique({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Task not found');
    }

    return this.prismaService.todo.update({
      where: { id },
      data: { done: true },
    });
  }

  async markTodoAsUndone(id: string) {
    const todo = await this.prismaService.todo.findUnique({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Task not found');
    }

    return this.prismaService.todo.update({
      where: { id },
      data: { done: false },
    });
  }

  async createSubtask(todoId: string, createSubtaskDto: CreateSubtaskDto) {
    const todo = await this.prismaService.todo.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      throw new NotFoundException('Task not found');
    }

    return this.prismaService.subtask.create({
      data: {
        label: createSubtaskDto.label,
        todo: { connect: { id: todoId } },
      },
    });
  }

  async remove(id: string) {
    return await this.prismaService.todo.delete({
      where: {
        id: id,
      },
    });
  }
}
