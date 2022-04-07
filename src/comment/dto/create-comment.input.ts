import { InputType, Int, Field } from '@nestjs/graphql';
import { IsAlpha, IsNumber, IsString, Min } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @IsAlpha()
  @Field(() => String, { description: 'Author of a comment' })
  author: string;

  @IsNumber()
  @Min(1)
  @Field(() => Int, { description: 'Id of a book that comment for' })
  bookId: number;

  @IsString()
  @Field(() => String, { description: 'Content of a comment' })
  content: string;
}
