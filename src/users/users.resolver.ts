import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { PaginationParam } from 'src/common/dto/pagination.param';
import { UserPaginationResponse } from './dto/user-pagination.response';


@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserPaginationResponse, { name: 'users' })
  findAll(@Args('param') paginationParam: PaginationParam): Promise<UserPaginationResponse> {
    return this.usersService.findAll(paginationParam);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('id', { type: () => String }) id: string, @Args('input') updateUserInput: UpdateUserInput) {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }
}
