import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Alumno, AlumnoRelations, Matricula, Confirmacion, Adicion, Cambio, Retiro} from '../models';
import {MatriculaRepository} from './matricula.repository';
import {ConfirmacionRepository} from './confirmacion.repository';
import {AdicionRepository} from './adicion.repository';
import {CambioRepository} from './cambio.repository';
import {RetiroRepository} from './retiro.repository';

export class AlumnoRepository extends DefaultCrudRepository<
  Alumno,
  typeof Alumno.prototype.id,
  AlumnoRelations
> {

  public readonly matriculas: HasManyRepositoryFactory<Matricula, typeof Alumno.prototype.id>;

  public readonly confirmacions: HasManyRepositoryFactory<Confirmacion, typeof Alumno.prototype.id>;

  public readonly adicions: HasManyRepositoryFactory<Adicion, typeof Alumno.prototype.id>;

  public readonly cambios: HasManyRepositoryFactory<Cambio, typeof Alumno.prototype.id>;

  public readonly retiros: HasManyRepositoryFactory<Retiro, typeof Alumno.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('MatriculaRepository') protected matriculaRepositoryGetter: Getter<MatriculaRepository>, @repository.getter('ConfirmacionRepository') protected confirmacionRepositoryGetter: Getter<ConfirmacionRepository>, @repository.getter('AdicionRepository') protected adicionRepositoryGetter: Getter<AdicionRepository>, @repository.getter('CambioRepository') protected cambioRepositoryGetter: Getter<CambioRepository>, @repository.getter('RetiroRepository') protected retiroRepositoryGetter: Getter<RetiroRepository>,
  ) {
    super(Alumno, dataSource);
    this.retiros = this.createHasManyRepositoryFactoryFor('retiros', retiroRepositoryGetter,);
    this.registerInclusionResolver('retiros', this.retiros.inclusionResolver);
    this.cambios = this.createHasManyRepositoryFactoryFor('cambios', cambioRepositoryGetter,);
    this.registerInclusionResolver('cambios', this.cambios.inclusionResolver);
    this.adicions = this.createHasManyRepositoryFactoryFor('adicions', adicionRepositoryGetter,);
    this.registerInclusionResolver('adicions', this.adicions.inclusionResolver);
    this.confirmacions = this.createHasManyRepositoryFactoryFor('confirmacions', confirmacionRepositoryGetter,);
    this.registerInclusionResolver('confirmacions', this.confirmacions.inclusionResolver);
    this.matriculas = this.createHasManyRepositoryFactoryFor('matriculas', matriculaRepositoryGetter,);
    this.registerInclusionResolver('matriculas', this.matriculas.inclusionResolver);
  }
}
