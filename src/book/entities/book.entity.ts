import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from '../../author/entities/author.entity';
import { Comment } from '../../comment/entities/comment.entity';

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
  @JoinColumn({ name: 'author_id', referencedColumnName: 'id' })
  author: Author;

  @OneToMany(() => Comment, (comment) => comment.book)
  @JoinColumn()
  @Field(() => [Comment], {
    description: 'Comments that was added to the book',
    nullable: true,
  })
  comments: Comment[];
}
