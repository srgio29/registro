import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Confirmacion, ConfirmacionRelations, Alumno, Carrera, Matricula, Adicion, Cambio, Retiro} from '../models';
import {AlumnoRepository} from './alumno.repository';
import {CarreraRepository} from './carrera.repository';
import {MatriculaRepository} from './matricula.repository';
import {AdicionRepository} from './adicion.repository';
import {CambioRepository} from './cambio.repository';
import {RetiroRepository} from './retiro.repository';

export class ConfirmacionRepository extends DefaultCrudRepository<
  Confirmacion,
  typeof Confirmacion.prototype.id,
  ConfirmacionRelations
> {

  public readonly alumno: BelongsToAccessor<Alumno, typeof Confirmacion.prototype.id>;

  public readonly carrera: BelongsToAccessor<Carrera, typeof Confirmacion.prototype.id>;

  public readonly matricula: BelongsToAccessor<Matricula, typeof Confirmacion.prototype.id>;

  public readonly adicions: HasManyRepositoryFactory<Adicion, typeof Confirmacion.prototype.id>;

  public readonly cambios: HasManyRepositoryFactory<Cambio, typeof Confirmacion.prototype.id>;

  public readonly retiros: HasManyRepositoryFactory<Retiro, typeof Confirmacion.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('AlumnoRepository') protected alumnoRepositoryGetter: Getter<AlumnoRepository>, @repository.getter('CarreraRepository') protected carreraRepositoryGetter: Getter<CarreraRepository>, @repository.getter('MatriculaRepository') protected matriculaRepositoryGetter: Getter<MatriculaRepository>, @repository.getter('AdicionRepository') protected adicionRepositoryGetter: Getter<AdicionRepository>, @repository.getter('CambioRepository') protected cambioRepositoryGetter: Getter<CambioRepository>, @repository.getter('RetiroRepository') protected retiroRepositoryGetter: Getter<RetiroRepository>,
  ) {
    super(Confirmacion, dataSource);
    this.retiros = this.createHasManyRepositoryFactoryFor('retiros', retiroRepositoryGetter,);
    this.registerInclusionResolver('retiros', this.retiros.inclusionResolver);
    this.cambios = this.createHasManyRepositoryFactoryFor('cambios', cambioRepositoryGetter,);
    this.registerInclusionResolver('cambios', this.cambios.inclusionResolver);
    this.adicions = this.createHasManyRepositoryFactoryFor('adicions', adicionRepositoryGetter,);
    this.registerInclusionResolver('adicions', this.adicions.inclusionResolver);
    this.matricula = this.createBelongsToAccessorFor('matricula', matriculaRepositoryGetter,);
    this.registerInclusionResolver('matricula', this.matricula.inclusionResolver);
    this.carrera = this.createBelongsToAccessorFor('carrera', carreraRepositoryGetter,);
    this.registerInclusionResolver('carrera', this.carrera.inclusionResolver);
    this.alumno = this.createBelongsToAccessorFor('alumno', alumnoRepositoryGetter,);
    this.registerInclusionResolver('alumno', this.alumno.inclusionResolver);
  }
}
