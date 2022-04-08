import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../../book/entities/book.entity';

@Entity('comments')
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Id of a comment' })
  id: number;

  @Column()
  @Field(() => String, { description: 'Author of a comment' })
  author: string;

  @Column()
  bookId: number;

  @ManyToOne(() => Book, (book) => book.comments)
  @Field(() => Book, { description: 'Id of a book that commented by' })
  book: Book;

  @Column()
  @Field(() => String, { description: 'Content of a comment' })
  content: string;
}
