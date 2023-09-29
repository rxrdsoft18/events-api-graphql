import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OutputLoginDto {
  @Field()
  accessToken: string;
  @Field()
  userId: string;
}
