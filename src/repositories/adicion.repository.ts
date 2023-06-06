import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Adicion, AdicionRelations} from '../models';

export class AdicionRepository extends DefaultCrudRepository<
  Adicion,
  typeof Adicion.prototype.id,
  AdicionRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Adicion, dataSource);
  }
}
