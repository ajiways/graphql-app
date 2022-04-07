import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Comment } from '../comment/entities/comment.entity';
import { CommentService } from '../comment/comment.service';
import { Author } from '../author/entities/author.entity';

@Resolver(() => Book)
export class BookResolver {
  constructor(
    private readonly bookService: BookService,
    private readonly commentsService: CommentService,
  ) {}

  @Mutation(() => Book)
  createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    return this.bookService.create(createBookInput);
  }

  @Query(() => [Book], { name: 'book' })
  findAll() {
    return this.bookService.findAll();
  }

  @ResolveField(() => [Comment])
  async comments(@Parent() book: Book) {
    return await this.commentsService.getAllByBook(book);
  }

  @ResolveField(() => Author)
  async author(@Parent() book: Book) {
    return await this.bookService.getAuthor(book);
  }

  @Query(() => Book, { name: 'book' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.bookService.findOne(id);
  }

  @Mutation(() => Book)
  updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return this.bookService.update(updateBookInput);
  }

  @Mutation(() => Book)
  removeBook(@Args('id', { type: () => Int }) id: number) {
    return this.bookService.remove(id);
  }
}
