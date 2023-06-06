import {Entity, model, property, hasMany} from '@loopback/repository';
import {Matricula} from './matricula.model';
import {Confirmacion} from './confirmacion.model';
import {Adicion} from './adicion.model';
import {Cambio} from './cambio.model';
import {Retiro} from './retiro.model';

@model()
export class Alumno extends Entity {
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
    required: true,
  })
  email: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_nacimiento: string;

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

  constructor(data?: Partial<Alumno>) {
    super(data);
  }
}

export interface AlumnoRelations {
  // describe navigational properties here
}

export type AlumnoWithRelations = Alumno & AlumnoRelations;
