import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Todo } from '@prisma/client';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { TodoService } from './todo.service';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      return await this.todoService.create(createTodoDto);
    } catch (error) {
      throw new HttpException('Error creating tasks', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<Todo[]> {
    try {
      return await this.todoService.findAll();
    } catch (error) {
      throw new HttpException(
        'Error fetching tasks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    try {
      return await this.todoService.findOne(id);
    } catch (error) {
      throw new HttpException('Error fetching task', HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    try {
      return await this.todoService.update(id, updateTodoDto);
    } catch (error) {
      throw new HttpException('Error updating task', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Todo> {
    try {
      return await this.todoService.remove(id);
    } catch (error) {
      throw new HttpException(
        'Error deleting task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
