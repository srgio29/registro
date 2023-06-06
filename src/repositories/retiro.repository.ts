import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Retiro, RetiroRelations} from '../models';

export class RetiroRepository extends DefaultCrudRepository<
  Retiro,
  typeof Retiro.prototype.id,
  RetiroRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Retiro, dataSource);
  }
}
