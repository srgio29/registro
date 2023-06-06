import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Matricula, MatriculaRelations} from '../models';

export class MatriculaRepository extends DefaultCrudRepository<
  Matricula,
  typeof Matricula.prototype.id,
  MatriculaRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Matricula, dataSource);
  }
}
