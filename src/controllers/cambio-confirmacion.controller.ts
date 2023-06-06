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
  Confirmacion,
} from '../models';
import {CambioRepository} from '../repositories';

export class CambioConfirmacionController {
  constructor(
    @repository(CambioRepository)
    public cambioRepository: CambioRepository,
  ) { }

  @get('/cambios/{id}/confirmacion', {
    responses: {
      '200': {
        description: 'Confirmacion belonging to Cambio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Confirmacion)},
          },
        },
      },
    },
  })
  async getConfirmacion(
    @param.path.string('id') id: typeof Cambio.prototype.id,
  ): Promise<Confirmacion> {
    return this.cambioRepository.confirmacion(id);
  }
}
