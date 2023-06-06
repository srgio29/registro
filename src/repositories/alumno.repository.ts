import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Alumno, AlumnoRelations} from '../models';

export class AlumnoRepository extends DefaultCrudRepository<
  Alumno,
  typeof Alumno.prototype.id,
  AlumnoRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Alumno, dataSource);
  }
}
