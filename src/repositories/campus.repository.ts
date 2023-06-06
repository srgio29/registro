import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Campus, CampusRelations} from '../models';

export class CampusRepository extends DefaultCrudRepository<
  Campus,
  typeof Campus.prototype.id,
  CampusRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Campus, dataSource);
  }
}
