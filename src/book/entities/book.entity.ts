import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Id of a book' })
  id: number;

  @Column()
  @Field(() => String, { description: 'Title of a book' })
  title: string;

  @Column()
  @Field(() => String, { description: 'Author of a book' })
  author: string;
}
