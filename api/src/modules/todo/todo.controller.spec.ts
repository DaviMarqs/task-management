import { Test, TestingModule } from '@nestjs/testing';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
// import { UpdateTodoDto } from './dtos/update-todo.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { TodoModule } from './todo.module';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TodoModule, PrismaModule],
      controllers: [TodoController],
      providers: [TodoService],
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

      try {
        await controller.create(createTodoDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.response).toBe('Error creating tasks');
        expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      }
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

        try {
          await controller.findAll();
        } catch (error) {
          expect(error.status).toBe(500);
          expect(error.message).toBe('Error fetching tasks');
        }
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
          substasks: [],
        };

        jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

        const result = await controller.findOne(todoId);
        expect(result).toEqual(expectedResult);
      });

      it('should throw a HttpException with status 404 when TodoService throws an error', async () => {
        const todoId = 'non-existent-id';
        jest.spyOn(service, 'findOne').mockResolvedValue(null);

        try {
          await controller.findOne(todoId);
        } catch (error) {
          expect(error.status).toBe(404);
          expect(error.message).toBe('Error fetching task');
        }
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
          .mockRejectedValue(new Error('Some error'));

        try {
          await controller.update(todoId, updateTodoDto);
        } catch (error) {
          expect(error.status).toBe(400);
          expect(error.message).toBe('Error updating task');
        }
      });
    });

    describe('remove', () => {
      it('should remove a todo by ID', async () => {
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
          .mockRejectedValue(new Error('Some error'));

        try {
          await controller.remove(todoId);
        } catch (error) {
          expect(error.status).toBe(500);
          expect(error.message).toBe('Error deleting task');
        }
      });
    });
  });
});
