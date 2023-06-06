import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Docente, DocenteRelations} from '../models';

export class DocenteRepository extends DefaultCrudRepository<
  Docente,
  typeof Docente.prototype.id,
  DocenteRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Docente, dataSource);
  }
}
