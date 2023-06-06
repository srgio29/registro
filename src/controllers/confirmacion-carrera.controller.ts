import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Confirmacion,
  Carrera,
} from '../models';
import {ConfirmacionRepository} from '../repositories';

export class ConfirmacionCarreraController {
  constructor(
    @repository(ConfirmacionRepository)
    public confirmacionRepository: ConfirmacionRepository,
  ) { }

  @get('/confirmacions/{id}/carrera', {
    responses: {
      '200': {
        description: 'Carrera belonging to Confirmacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Carrera)},
          },
        },
      },
    },
  })
  async getCarrera(
    @param.path.string('id') id: typeof Confirmacion.prototype.id,
  ): Promise<Carrera> {
    return this.confirmacionRepository.carrera(id);
  }
}
