import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from '../../author/entities/author.entity';

@ObjectType()
@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Id of a book' })
  id: number;

  @Column()
  @Field(() => String, { description: 'Title of a book' })
  title: string;

  @ManyToOne(() => Author, (author) => author.books)
  @Field(() => Author, { description: 'Author of a book' })
  @JoinColumn({ name: 'author', referencedColumnName: 'id' })
  author: Author;
}
