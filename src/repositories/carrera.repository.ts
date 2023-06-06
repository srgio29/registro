import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Carrera, CarreraRelations, Docente, Matricula, Confirmacion, Adicion, Cambio, Retiro} from '../models';
import {DocenteRepository} from './docente.repository';
import {MatriculaRepository} from './matricula.repository';
import {ConfirmacionRepository} from './confirmacion.repository';
import {AdicionRepository} from './adicion.repository';
import {CambioRepository} from './cambio.repository';
import {RetiroRepository} from './retiro.repository';

export class CarreraRepository extends DefaultCrudRepository<
  Carrera,
  typeof Carrera.prototype.id,
  CarreraRelations
> {

  public readonly docente: BelongsToAccessor<Docente, typeof Carrera.prototype.id>;

  public readonly matriculas: HasManyRepositoryFactory<Matricula, typeof Carrera.prototype.id>;

  public readonly confirmacions: HasManyRepositoryFactory<Confirmacion, typeof Carrera.prototype.id>;

  public readonly adicions: HasManyRepositoryFactory<Adicion, typeof Carrera.prototype.id>;

  public readonly cambios: HasManyRepositoryFactory<Cambio, typeof Carrera.prototype.id>;

  public readonly retiros: HasManyRepositoryFactory<Retiro, typeof Carrera.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('DocenteRepository') protected docenteRepositoryGetter: Getter<DocenteRepository>, @repository.getter('MatriculaRepository') protected matriculaRepositoryGetter: Getter<MatriculaRepository>, @repository.getter('ConfirmacionRepository') protected confirmacionRepositoryGetter: Getter<ConfirmacionRepository>, @repository.getter('AdicionRepository') protected adicionRepositoryGetter: Getter<AdicionRepository>, @repository.getter('CambioRepository') protected cambioRepositoryGetter: Getter<CambioRepository>, @repository.getter('RetiroRepository') protected retiroRepositoryGetter: Getter<RetiroRepository>,
  ) {
    super(Carrera, dataSource);
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
    this.docente = this.createBelongsToAccessorFor('docente', docenteRepositoryGetter,);
    this.registerInclusionResolver('docente', this.docente.inclusionResolver);
  }
}
