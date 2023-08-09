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
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSubtaskDto } from './dtos/create-subtask';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { TodoEntity } from './entities/prisma/todo.entity';
import { TodoService } from './todo.service';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    try {
      return this.todoService.create(createTodoDto);
    } catch (error) {
      throw new HttpException('Error creating tasks', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAll(@Query('filter') filter: string): Promise<TodoEntity[]> {
    try {
      return this.todoService.findAll(filter);
    } catch (error) {
      throw new HttpException(
        'Error fetching tasks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TodoEntity> {
    try {
      return this.todoService.findOne(id);
    } catch (error) {
      throw new HttpException('Error fetching task', HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<TodoEntity> {
    try {
      return this.todoService.update(id, updateTodoDto);
    } catch (error) {
      throw new HttpException('Error updating task', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id/done')
  markTodoAsDone(@Param('id') id: string): Promise<TodoEntity> {
    try {
      return this.todoService.markTodoAsDone(id);
    } catch (error) {
      throw new HttpException(
        'Error marking task as done',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id/undone')
  markTodoAsUndone(@Param('id') id: string): Promise<TodoEntity> {
    try {
      return this.todoService.markTodoAsUndone(id);
    } catch (error) {
      throw new HttpException(
        'Error marking task as undone',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':id/subtasks')
  createSubtask(
    @Param('id') id: string,
    @Body() createSubtaskDto: CreateSubtaskDto,
  ) {
    return this.todoService.createSubtask(id, createSubtaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<TodoEntity> {
    try {
      return this.todoService.remove(id);
    } catch (error) {
      throw new HttpException(
        'Error deleting task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
