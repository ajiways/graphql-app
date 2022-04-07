import { CreateAuthorInput } from './create-author.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { IsAlpha, IsNumber, Min } from 'class-validator';

@InputType()
export class UpdateAuthorInput extends PartialType(CreateAuthorInput) {
  @IsNumber()
  @Min(1)
  @Field(() => Int, { description: 'Id of author that needs to be updated' })
  id: number;

  @IsAlpha()
  @Field(() => String, { description: 'Author first name' })
  firstName: string;

  @IsAlpha()
  @Field(() => String, { description: 'Author last name' })
  lastName: string;
}
