import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookService } from '../book/book.service';
import { Book } from '../book/entities/book.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly bookService: BookService,
  ) {}

  async getAllByBook(book: Book) {
    return this.commentRepository.find({ where: { book } });
  }

  async create(createCommentInput: CreateCommentInput) {
    const book = await this.bookService.findOne(createCommentInput.bookId);

    return this.commentRepository.save({
      author: createCommentInput.author,
      content: createCommentInput.content,
      book,
    });
  }

  findAll() {
    return this.commentRepository.find();
  }

  async findOne(id: number) {
    const candidate = await this.commentRepository.findOne({ where: { id } });

    if (!candidate)
      throw new NotFoundException(`Comment with id ${id} was not found`);

    return candidate;
  }

  async update(updateCommentInput: UpdateCommentInput) {
    const book = await this.findOne(updateCommentInput.id);

    return this.commentRepository.merge(book, updateCommentInput);
  }

  async remove(id: number) {
    const book = await this.findOne(id);

    return this.commentRepository.remove(book);
  }
}
