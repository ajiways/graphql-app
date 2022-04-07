import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @ManyToOne(() => Book, (book) => book.comments)
  @JoinColumn({ name: 'book_id', referencedColumnName: 'id' })
  @Field(() => Book, { description: 'Id of a book that commented by' })
  book: Book;

  @Column()
  @Field(() => String, { description: 'Content of a comment' })
  content: string;
}
