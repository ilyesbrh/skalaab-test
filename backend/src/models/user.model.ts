import {Entity, hasOne, model, property, hasMany} from '@loopback/repository';
import {UserCredentials} from './user-credentials.model';
import {Todo} from './todo.model';

@model({
  settings: {
    indexes: {
      uniqueEmail: {
        keys: {
          email: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  @hasMany(() => Todo)
  todos: Todo[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
}


export type UserWithRelations = User & UserRelations
