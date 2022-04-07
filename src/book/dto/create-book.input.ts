import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class CreateBookInput {
  @IsAlpha()
  @Field(() => String, { description: 'Title of a book' })
  title: string;

  @IsAlpha()
  @Field(() => String, { description: 'Author of a book' })
  author: string;
}
