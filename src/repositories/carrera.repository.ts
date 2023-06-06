import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Carrera, CarreraRelations} from '../models';

export class CarreraRepository extends DefaultCrudRepository<
  Carrera,
  typeof Carrera.prototype.id,
  CarreraRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Carrera, dataSource);
  }
}
