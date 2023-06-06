import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Confirmacion, ConfirmacionRelations} from '../models';

export class ConfirmacionRepository extends DefaultCrudRepository<
  Confirmacion,
  typeof Confirmacion.prototype.id,
  ConfirmacionRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Confirmacion, dataSource);
  }
}
