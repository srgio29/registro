import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Retiro,
  Confirmacion,
} from '../models';
import {RetiroRepository} from '../repositories';

export class RetiroConfirmacionController {
  constructor(
    @repository(RetiroRepository)
    public retiroRepository: RetiroRepository,
  ) { }

  @get('/retiros/{id}/confirmacion', {
    responses: {
      '200': {
        description: 'Confirmacion belonging to Retiro',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Confirmacion)},
          },
        },
      },
    },
  })
  async getConfirmacion(
    @param.path.string('id') id: typeof Retiro.prototype.id,
  ): Promise<Confirmacion> {
    return this.retiroRepository.confirmacion(id);
  }
}
