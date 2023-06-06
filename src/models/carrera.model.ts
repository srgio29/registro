import {Entity, model, property} from '@loopback/repository';

@model()
export class Carrera extends Entity {
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
  })
  duracion?: string;

  @property({
    type: 'string',
    required: true,
  })
  id_docente: string;


  constructor(data?: Partial<Carrera>) {
    super(data);
  }
}

export interface CarreraRelations {
  // describe navigational properties here
}

export type CarreraWithRelations = Carrera & CarreraRelations;
