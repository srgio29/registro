import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Docente, DocenteRelations, Carrera} from '../models';
import {CarreraRepository} from './carrera.repository';

export class DocenteRepository extends DefaultCrudRepository<
  Docente,
  typeof Docente.prototype.id,
  DocenteRelations
> {

  public readonly carreras: HasManyRepositoryFactory<Carrera, typeof Docente.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('CarreraRepository') protected carreraRepositoryGetter: Getter<CarreraRepository>,
  ) {
    super(Docente, dataSource);
    this.carreras = this.createHasManyRepositoryFactoryFor('carreras', carreraRepositoryGetter,);
    this.registerInclusionResolver('carreras', this.carreras.inclusionResolver);
  }
}
