import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Alumno} from './alumno.model';
import {Carrera} from './carrera.model';
import {Matricula} from './matricula.model';
import {Adicion} from './adicion.model';
import {Cambio} from './cambio.model';
import {Retiro} from './retiro.model';

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

  @belongsTo(() => Alumno)
  alumnoId: string;

  @belongsTo(() => Carrera)
  carreraId: string;

  @belongsTo(() => Matricula)
  matriculaId: string;

  @hasMany(() => Adicion)
  adicions: Adicion[];

  @hasMany(() => Cambio)
  cambios: Cambio[];

  @hasMany(() => Retiro)
  retiros: Retiro[];

  constructor(data?: Partial<Confirmacion>) {
    super(data);
  }
}

export interface ConfirmacionRelations {
  // describe navigational properties here
}

export type ConfirmacionWithRelations = Confirmacion & ConfirmacionRelations;
