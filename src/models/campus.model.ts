import {Entity, model, property} from '@loopback/repository';

@model()
export class Campus extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  ubicacion: string;


  constructor(data?: Partial<Campus>) {
    super(data);
  }
}

export interface CampusRelations {
  // describe navigational properties here
}

export type CampusWithRelations = Campus & CampusRelations;
