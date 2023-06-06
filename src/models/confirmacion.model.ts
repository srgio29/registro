import {Entity, model, property} from '@loopback/repository';

@model()
export class Confirmacion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  id_alumno: string;

  @property({
    type: 'string',
    required: true,
  })
  id_carrera: string;

  @property({
    type: 'string',
    required: true,
  })
  id_campus: string;

  @property({
    type: 'string',
    required: true,
  })
  id_matricula: string;


  constructor(data?: Partial<Confirmacion>) {
    super(data);
  }
}

export interface ConfirmacionRelations {
  // describe navigational properties here
}

export type ConfirmacionWithRelations = Confirmacion & ConfirmacionRelations;
