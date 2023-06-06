import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Adicion, AdicionRelations, Alumno, Carrera, Confirmacion} from '../models';
import {AlumnoRepository} from './alumno.repository';
import {CarreraRepository} from './carrera.repository';
import {ConfirmacionRepository} from './confirmacion.repository';

export class AdicionRepository extends DefaultCrudRepository<
  Adicion,
  typeof Adicion.prototype.id,
  AdicionRelations
> {

  public readonly alumno: BelongsToAccessor<Alumno, typeof Adicion.prototype.id>;

  public readonly carrera: BelongsToAccessor<Carrera, typeof Adicion.prototype.id>;

  public readonly confirmacion: BelongsToAccessor<Confirmacion, typeof Adicion.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('AlumnoRepository') protected alumnoRepositoryGetter: Getter<AlumnoRepository>, @repository.getter('CarreraRepository') protected carreraRepositoryGetter: Getter<CarreraRepository>, @repository.getter('ConfirmacionRepository') protected confirmacionRepositoryGetter: Getter<ConfirmacionRepository>,
  ) {
    super(Adicion, dataSource);
    this.confirmacion = this.createBelongsToAccessorFor('confirmacion', confirmacionRepositoryGetter,);
    this.registerInclusionResolver('confirmacion', this.confirmacion.inclusionResolver);
    this.carrera = this.createBelongsToAccessorFor('carrera', carreraRepositoryGetter,);
    this.registerInclusionResolver('carrera', this.carrera.inclusionResolver);
    this.alumno = this.createBelongsToAccessorFor('alumno', alumnoRepositoryGetter,);
    this.registerInclusionResolver('alumno', this.alumno.inclusionResolver);
  }
}
