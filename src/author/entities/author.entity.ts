import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from '../../book/entities/book.entity';

@ObjectType()
@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Author id' })
  id: number;

  @Column()
  @Field(() => String, { description: 'Author first name' })
  firstName: string;

  @Column()
  @Field(() => String, { description: 'Author last name' })
  lastName: string;

  @OneToMany(() => Book, (book) => book.author)
  @Field(() => [Book], {
    description: 'Books that was written by this author',
    nullable: true,
  })
  @JoinColumn()
  books: Book[];
}
