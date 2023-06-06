import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Docente} from './docente.model';
import {Matricula} from './matricula.model';
import {Confirmacion} from './confirmacion.model';
import {Adicion} from './adicion.model';
import {Cambio} from './cambio.model';
import {Retiro} from './retiro.model';

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

  @belongsTo(() => Docente)
  docenteId: string;

  @hasMany(() => Matricula)
  matriculas: Matricula[];

  @hasMany(() => Confirmacion)
  confirmacions: Confirmacion[];

  @hasMany(() => Adicion)
  adicions: Adicion[];

  @hasMany(() => Cambio)
  cambios: Cambio[];

  @hasMany(() => Retiro)
  retiros: Retiro[];

  constructor(data?: Partial<Carrera>) {
    super(data);
  }
}

export interface CarreraRelations {
  // describe navigational properties here
}

export type CarreraWithRelations = Carrera & CarreraRelations;
