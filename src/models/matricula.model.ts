import {Entity, model, property} from '@loopback/repository';

@model()
export class Matricula extends Entity {
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
  fecha_matricula: string;

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


  constructor(data?: Partial<Matricula>) {
    super(data);
  }
}

export interface MatriculaRelations {
  // describe navigational properties here
}

export type MatriculaWithRelations = Matricula & MatriculaRelations;
