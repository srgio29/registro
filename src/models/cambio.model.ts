import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Alumno} from './alumno.model';
import {Carrera} from './carrera.model';
import {Confirmacion} from './confirmacion.model';

@model()
export class Cambio extends Entity {
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

  @belongsTo(() => Carrera)
  carreraId: string;

  @belongsTo(() => Confirmacion)
  confirmacionId: string;

  constructor(data?: Partial<Cambio>) {
    super(data);
  }
}

export interface CambioRelations {
  // describe navigational properties here
}

export type CambioWithRelations = Cambio & CambioRelations;
