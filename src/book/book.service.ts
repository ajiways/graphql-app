import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorService } from '../author/author.service';
import { Author } from '../author/entities/author.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    private readonly authorService: AuthorService,
  ) {}

  getAuthor(book: Book) {
    return this.authorService.findByBooks([book]);
  }

  getAllByAuthor(author: Author) {
    return this.bookRepository.find({ where: { author } });
  }

  async create(createBookInput: CreateBookInput) {
    const author = await this.authorService.findOne(createBookInput.authorId);

    return this.bookRepository.save({
      author: author,
      title: createBookInput.title,
    });
  }

  findAll() {
    return this.bookRepository.find();
  }

  async findOne(id: number) {
    const candidate = await this.bookRepository.findOne({ where: { id } });

    if (!candidate)
      throw new NotFoundException(`Book with id ${id} was not found`);

    return candidate;
  }

  async update(updateBookInput: UpdateBookInput) {
    const candidate = await this.findOne(updateBookInput.id);

    return this.bookRepository.merge(candidate, updateBookInput);
  }

  async remove(id: number) {
    const candidate = await this.findOne(id);

    if (!candidate)
      throw new NotFoundException(`Book with id ${id} was not found`);

    return this.bookRepository.remove(candidate);
  }
}
