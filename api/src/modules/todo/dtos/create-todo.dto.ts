import { OmitType } from '@nestjs/mapped-types';
import { TodoEntity } from '../entities/prisma/todo.entity';

export class CreateTodoDto extends OmitType(TodoEntity, [
  'id',
  'done',
  'created_at',
  'updated_at',
]) {}
