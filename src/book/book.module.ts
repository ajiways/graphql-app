import { forwardRef, Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { AuthorModule } from '../author/author.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), forwardRef(() => AuthorModule)],
  providers: [BookResolver, BookService],
  exports: [BookService],
})
export class BookModule {}
