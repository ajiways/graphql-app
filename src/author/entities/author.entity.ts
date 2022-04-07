import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
