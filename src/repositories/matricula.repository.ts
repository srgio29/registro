import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Matricula, MatriculaRelations, Alumno, Carrera, Confirmacion} from '../models';
import {AlumnoRepository} from './alumno.repository';
import {CarreraRepository} from './carrera.repository';
import {ConfirmacionRepository} from './confirmacion.repository';

export class MatriculaRepository extends DefaultCrudRepository<
  Matricula,
  typeof Matricula.prototype.id,
  MatriculaRelations
> {

  public readonly alumno: BelongsToAccessor<Alumno, typeof Matricula.prototype.id>;

  public readonly carrera: BelongsToAccessor<Carrera, typeof Matricula.prototype.id>;

  public readonly confirmacions: HasManyRepositoryFactory<Confirmacion, typeof Matricula.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('AlumnoRepository') protected alumnoRepositoryGetter: Getter<AlumnoRepository>, @repository.getter('CarreraRepository') protected carreraRepositoryGetter: Getter<CarreraRepository>, @repository.getter('ConfirmacionRepository') protected confirmacionRepositoryGetter: Getter<ConfirmacionRepository>,
  ) {
    super(Matricula, dataSource);
    this.confirmacions = this.createHasManyRepositoryFactoryFor('confirmacions', confirmacionRepositoryGetter,);
    this.registerInclusionResolver('confirmacions', this.confirmacions.inclusionResolver);
    this.carrera = this.createBelongsToAccessorFor('carrera', carreraRepositoryGetter,);
    this.registerInclusionResolver('carrera', this.carrera.inclusionResolver);
    this.alumno = this.createBelongsToAccessorFor('alumno', alumnoRepositoryGetter,);
    this.registerInclusionResolver('alumno', this.alumno.inclusionResolver);
  }
}
