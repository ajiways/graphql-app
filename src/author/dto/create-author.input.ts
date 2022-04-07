import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class CreateAuthorInput {
  @IsAlpha()
  @Field(() => String, { description: 'Author first name' })
  firstName: string;

  @IsAlpha()
  @Field(() => String, { description: 'Author last name' })
  lastName: string;
}
