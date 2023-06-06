import {Entity, model, property} from '@loopback/repository';

@model()
export class Docente extends Entity {
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
  apellido: string;

  @property({
    type: 'string',
  })
  titulo?: string;


  constructor(data?: Partial<Docente>) {
    super(data);
  }
}

export interface DocenteRelations {
  // describe navigational properties here
}

export type DocenteWithRelations = Docente & DocenteRelations;
