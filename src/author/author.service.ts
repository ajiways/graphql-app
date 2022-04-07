import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../book/entities/book.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  findByBooks(books: Book[]) {
    return this.authorRepository.findOne({ where: { books } });
  }

  create(createAuthorInput: CreateAuthorInput) {
    return this.authorRepository.save(createAuthorInput);
  }

  findAll() {
    return this.authorRepository.find();
  }

  async findOne(id: number) {
    const candidate = await this.authorRepository.findOne({ where: { id } });

    if (!candidate)
      throw new NotFoundException(`Author with id ${id} was not found.`);

    return candidate;
  }

  async update(updateAuthorInput: UpdateAuthorInput) {
    const candidate = await this.findOne(updateAuthorInput.id);

    return this.authorRepository.merge(candidate, updateAuthorInput);
  }

  async remove(id: number) {
    const candidate = await this.findOne(id);

    return this.authorRepository.remove(candidate);
  }
}
