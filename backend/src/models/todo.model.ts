import {Entity, model, property} from '@loopback/repository';

@model()
export class Todo extends Entity {

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
  title: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'date',
  })
  date?: string;

  @property({
    type: 'boolean',
    default: false
  })
  done?: Boolean;

  @property({
    type: 'string',
  })
  userId?: string;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // describe navigational properties here
}

export type TodoWithRelations = Todo & TodoRelations;
