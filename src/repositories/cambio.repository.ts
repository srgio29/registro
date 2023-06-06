import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Cambio, CambioRelations, Alumno, Carrera, Confirmacion} from '../models';
import {AlumnoRepository} from './alumno.repository';
import {CarreraRepository} from './carrera.repository';
import {ConfirmacionRepository} from './confirmacion.repository';

export class CambioRepository extends DefaultCrudRepository<
  Cambio,
  typeof Cambio.prototype.id,
  CambioRelations
> {

  public readonly alumno: BelongsToAccessor<Alumno, typeof Cambio.prototype.id>;

  public readonly carrera: BelongsToAccessor<Carrera, typeof Cambio.prototype.id>;

  public readonly confirmacion: BelongsToAccessor<Confirmacion, typeof Cambio.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('AlumnoRepository') protected alumnoRepositoryGetter: Getter<AlumnoRepository>, @repository.getter('CarreraRepository') protected carreraRepositoryGetter: Getter<CarreraRepository>, @repository.getter('ConfirmacionRepository') protected confirmacionRepositoryGetter: Getter<ConfirmacionRepository>,
  ) {
    super(Cambio, dataSource);
    this.confirmacion = this.createBelongsToAccessorFor('confirmacion', confirmacionRepositoryGetter,);
    this.registerInclusionResolver('confirmacion', this.confirmacion.inclusionResolver);
    this.carrera = this.createBelongsToAccessorFor('carrera', carreraRepositoryGetter,);
    this.registerInclusionResolver('carrera', this.carrera.inclusionResolver);
    this.alumno = this.createBelongsToAccessorFor('alumno', alumnoRepositoryGetter,);
    this.registerInclusionResolver('alumno', this.alumno.inclusionResolver);
  }
}
