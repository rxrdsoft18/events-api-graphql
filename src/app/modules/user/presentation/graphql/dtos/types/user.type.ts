import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;
}
