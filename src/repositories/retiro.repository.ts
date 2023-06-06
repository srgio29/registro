import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Retiro, RetiroRelations, Alumno, Confirmacion} from '../models';
import {AlumnoRepository} from './alumno.repository';
import {ConfirmacionRepository} from './confirmacion.repository';

export class RetiroRepository extends DefaultCrudRepository<
  Retiro,
  typeof Retiro.prototype.id,
  RetiroRelations
> {

  public readonly alumno: BelongsToAccessor<Alumno, typeof Retiro.prototype.id>;

  public readonly confirmacion: BelongsToAccessor<Confirmacion, typeof Retiro.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('AlumnoRepository') protected alumnoRepositoryGetter: Getter<AlumnoRepository>, @repository.getter('ConfirmacionRepository') protected confirmacionRepositoryGetter: Getter<ConfirmacionRepository>,
  ) {
    super(Retiro, dataSource);
    this.confirmacion = this.createBelongsToAccessorFor('confirmacion', confirmacionRepositoryGetter,);
    this.registerInclusionResolver('confirmacion', this.confirmacion.inclusionResolver);
    this.alumno = this.createBelongsToAccessorFor('alumno', alumnoRepositoryGetter,);
    this.registerInclusionResolver('alumno', this.alumno.inclusionResolver);
  }
}
