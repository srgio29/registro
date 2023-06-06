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
  Carrera,
} from '../models';
import {AdicionRepository} from '../repositories';

export class AdicionCarreraController {
  constructor(
    @repository(AdicionRepository)
    public adicionRepository: AdicionRepository,
  ) { }

  @get('/adicions/{id}/carrera', {
    responses: {
      '200': {
        description: 'Carrera belonging to Adicion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Carrera)},
          },
        },
      },
    },
  })
  async getCarrera(
    @param.path.string('id') id: typeof Adicion.prototype.id,
  ): Promise<Carrera> {
    return this.adicionRepository.carrera(id);
  }
}
