import {Entity, model, property} from '@loopback/repository';

@model()
export class Adicion extends Entity {
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
  id_alumno: string;

  @property({
    type: 'string',
    required: true,
  })
  id_carrera: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  id_confirmacion: string;


  constructor(data?: Partial<Adicion>) {
    super(data);
  }
}

export interface AdicionRelations {
  // describe navigational properties here
}

export type AdicionWithRelations = Adicion & AdicionRelations;
