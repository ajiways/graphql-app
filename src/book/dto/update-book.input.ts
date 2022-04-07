import { CreateBookInput } from './create-book.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { IsAlpha, IsNumber, Min } from 'class-validator';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @IsAlpha()
  @Field(() => String, { description: 'Title of a book' })
  title: string;

  @IsNumber()
  @Min(1)
  @Field(() => Int, { description: 'Id of a book' })
  id: number;
}
