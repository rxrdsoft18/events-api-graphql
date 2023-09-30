import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserMeDto {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;
}
