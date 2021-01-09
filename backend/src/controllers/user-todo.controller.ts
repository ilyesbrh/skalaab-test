import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  Todo,
} from '../models';
import {UserRepository} from '../repositories';
import {inject} from '@loopback/core';

@authenticate('jwt')
export class UserTodoController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/todos', {
    responses: {
      '200': {
        description: 'Array of User has many Todo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Todo)},
          },
        },
      },
    },
  })
  async find(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.query.object('filter') filter?: Filter<Todo>,
  ): Promise<Todo[]> {
    return this.userRepository.todos(currentUserProfile[securityId]).find(filter);
  }

  @post('/users/todos', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Todo)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, {
            title: 'NewTodoInUser',
            exclude: ['id', 'userId']
          }),
        },
      },
    }) todo: Omit<Todo, 'id'>,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile
  ): Promise<Todo> {

    console.log(currentUserProfile[securityId]);

    return this.userRepository.todos(currentUserProfile[securityId]).create(todo);
  }

  @patch('/users/todos', {
    responses: {
      '200': {
        description: 'User.Todo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, {partial: true}),
        },
      },
    })
    todo: Partial<Todo>,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.query.object('where', getWhereSchemaFor(Todo)) where?: Where<Todo>,
  ): Promise<Count> {
    return this.userRepository.todos(currentUserProfile[securityId]).patch(todo, where);
  }

  @del('/users/todos', {
    responses: {
      '200': {
        description: 'User.Todo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.query.object('where', getWhereSchemaFor(Todo)) where?: Where<Todo>,
  ): Promise<Count> {
    return this.userRepository.todos(currentUserProfile[securityId]).delete(where);
  }
}
