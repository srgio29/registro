import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cambio,
  Alumno,
} from '../models';
import {CambioRepository} from '../repositories';

export class CambioAlumnoController {
  constructor(
    @repository(CambioRepository)
    public cambioRepository: CambioRepository,
  ) { }

  @get('/cambios/{id}/alumno', {
    responses: {
      '200': {
        description: 'Alumno belonging to Cambio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Alumno)},
          },
        },
      },
    },
  })
  async getAlumno(
    @param.path.string('id') id: typeof Cambio.prototype.id,
  ): Promise<Alumno> {
    return this.cambioRepository.alumno(id);
  }
}
