import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Cambio, CambioRelations} from '../models';

export class CambioRepository extends DefaultCrudRepository<
  Cambio,
  typeof Cambio.prototype.id,
  CambioRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Cambio, dataSource);
  }
}
