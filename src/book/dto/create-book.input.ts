import { InputType, Field, Int } from '@nestjs/graphql';
import { IsAlpha, IsNumber, Min } from 'class-validator';

@InputType()
export class CreateBookInput {
  @IsAlpha()
  @Field(() => String, { description: 'Title of a book' })
  title: string;

  @IsNumber()
  @Min(1)
  @Field(() => Int, { description: 'Author of a book id' })
  authorId: number;
}
