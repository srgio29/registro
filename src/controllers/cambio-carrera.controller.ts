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
  Carrera,
} from '../models';
import {CambioRepository} from '../repositories';

export class CambioCarreraController {
  constructor(
    @repository(CambioRepository)
    public cambioRepository: CambioRepository,
  ) { }

  @get('/cambios/{id}/carrera', {
    responses: {
      '200': {
        description: 'Carrera belonging to Cambio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Carrera)},
          },
        },
      },
    },
  })
  async getCarrera(
    @param.path.string('id') id: typeof Cambio.prototype.id,
  ): Promise<Carrera> {
    return this.cambioRepository.carrera(id);
  }
}
