import { CreateCommentInput } from './create-comment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNumber, IsString, Min } from 'class-validator';

@InputType()
export class UpdateCommentInput extends PartialType(CreateCommentInput) {
  @IsNumber()
  @Min(1)
  @Field(() => Int, { description: 'Id of comment that need to be updated' })
  id: number;

  @IsString()
  @Field(() => String, { description: 'New comment content' })
  content: string;
}
