import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService, PrismaService],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const createTodoDto: CreateTodoDto = { label: 'Test Todo' };
      const expectedResult = {
        id: 'some-id',
        label: 'Test Todo',
        done: false,
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(createTodoDto);
      expect(result).toEqual(expectedResult);
    });

    it('should throw a HttpException with status 400 when TodoService throws an error', async () => {
      const createTodoDto: CreateTodoDto = { label: 'Test Todo' };

      jest.spyOn(service, 'create').mockRejectedValue(new Error());

      await expect(controller.create(createTodoDto)).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const expectedResult = [
        {
          id: '1',
          label: 'Todo 1',
          done: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '2',
          label: 'Todo 2',
          done: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await controller.findAll('newest');
      expect(result).toEqual(expectedResult);
    });

    it('should throw a HttpException with status 500 when TodoService throws an error', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValue(new Error());

      await expect(controller.findAll('newest')).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a todo by ID', async () => {
      const todoId = 'some-id';
      const expectedResult = {
        id: 'some-id',
        label: 'Todo 1',
        done: false,
        created_at: new Date(),
        updated_at: new Date(),
        subtasks: [
          {
            id: '1',
            label: 'Subtask 1',
            done: false,
            created_at: new Date(),
            updated_at: new Date(),
            todoId: 'some-id',
          },
        ],
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      const result = await controller.findOne(todoId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw a PrismaClientKnownRequestError when TodoService throws an error', async () => {
      const todoId = 'non-existent-id';

      await expect(async () => {
        await controller.findOne(todoId);
      }).rejects.toThrow(PrismaClientKnownRequestError);
    });
  });

  describe('update', () => {
    it('should update a todo by ID', async () => {
      const todoId = 'some-id';
      const updateTodoDto: UpdateTodoDto = { label: 'Updated Todo' };
      const expectedResult = {
        id: todoId,
        label: 'Updated Todo',
        done: false,
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

      const result = await controller.update(todoId, updateTodoDto);
      expect(result).toEqual(expectedResult);
    });

    it('should throw a HttpException with status 400 when TodoService throws an error', async () => {
      const todoId = 'some-id';
      const updateTodoDto: UpdateTodoDto = { label: 'Updated Todo' };

      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new Error('Error updating task'));

      await expect(controller.update(todoId, updateTodoDto)).rejects.toThrow(
        new HttpException('Error updating task', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('markTodoAsDone', () => {
    it('should mark a todo as done by ID', async () => {
      const todoId = 'some-id';
      const expectedResult = {
        id: todoId,
        label: 'Todo',
        done: true,
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(service, 'markTodoAsDone').mockResolvedValue(expectedResult);

      const result = await controller.markTodoAsDone(todoId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw a HttpException with status 500 when TodoService throws an error', async () => {
      const todoId = 'some-id';

      jest
        .spyOn(service, 'markTodoAsDone')
        .mockRejectedValue(new Error('Error marking task as done'));

      await expect(async () => {
        await controller.markTodoAsDone(todoId);
      }).rejects.toThrow(
        new HttpException(
          'Error marking task as done',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('markTodoAsUndone', () => {
    it('should mark a todo as undone by ID', async () => {
      const todoId = 'some-id';
      const expectedResult = {
        id: todoId,
        label: 'Todo',
        done: false,
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(service, 'markTodoAsUndone').mockResolvedValue(expectedResult);

      const result = await controller.markTodoAsUndone(todoId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw a HttpException with status 500 when TodoService throws an error', async () => {
      const todoId = 'some-id';

      jest
        .spyOn(service, 'markTodoAsUndone')
        .mockRejectedValue(new Error('Error marking task as undone'));

      await expect(async () => {
        await controller.markTodoAsUndone(todoId);
      }).rejects.toThrow(
        new HttpException(
          'Error marking task as undone',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('delete', () => {
    it('should delete a todo by ID', async () => {
      const todoId = 'some-id';
      const expectedResult = {
        id: todoId,
        label: 'Deleted Todo',
        done: false,
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);

      const result = await controller.remove(todoId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw a HttpException with status 500 when TodoService throws an error', async () => {
      const todoId = 'some-id';

      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(new Error('Error deleting task'));

      await expect(async () => {
        await controller.remove(todoId);
      }).rejects.toThrow(
        new HttpException(
          'Error deleting task',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
});
