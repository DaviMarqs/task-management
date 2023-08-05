import { Module } from '@nestjs/common';
import { TodoModule } from './modules/todo/todo.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, TodoModule],
})
export class AppModule {}
