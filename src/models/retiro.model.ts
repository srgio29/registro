import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Alumno} from './alumno.model';
import {Confirmacion} from './confirmacion.model';

@model()
export class Retiro extends Entity {
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

  @belongsTo(() => Alumno)
  alumnoId: string;

  @property({
    type: 'string',
  })
  carreraId?: string;

  @belongsTo(() => Confirmacion)
  confirmacionId: string;

  constructor(data?: Partial<Retiro>) {
    super(data);
  }
}

export interface RetiroRelations {
  // describe navigational properties here
}

export type RetiroWithRelations = Retiro & RetiroRelations;
