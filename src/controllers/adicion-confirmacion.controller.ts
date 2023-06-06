import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Adicion,
  Confirmacion,
} from '../models';
import {AdicionRepository} from '../repositories';

export class AdicionConfirmacionController {
  constructor(
    @repository(AdicionRepository)
    public adicionRepository: AdicionRepository,
  ) { }

  @get('/adicions/{id}/confirmacion', {
    responses: {
      '200': {
        description: 'Confirmacion belonging to Adicion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Confirmacion)},
          },
        },
      },
    },
  })
  async getConfirmacion(
    @param.path.string('id') id: typeof Adicion.prototype.id,
  ): Promise<Confirmacion> {
    return this.adicionRepository.confirmacion(id);
  }
}
