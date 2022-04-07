import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Author } from '../author/entities/author.entity';
import { AuthorService } from '../author/author.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author])],
  providers: [BookResolver, BookService, AuthorService],
})
export class BookModule {}
