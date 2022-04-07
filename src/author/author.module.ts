import { forwardRef, Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorResolver } from './author.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { BookModule } from '../book/book.module';

@Module({
  imports: [TypeOrmModule.forFeature([Author]), forwardRef(() => BookModule)],
  providers: [AuthorResolver, AuthorService],
  exports: [AuthorService],
})
export class AuthorModule {}
