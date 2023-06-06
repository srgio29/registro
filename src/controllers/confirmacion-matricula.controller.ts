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
  Matricula,
} from '../models';
import {ConfirmacionRepository} from '../repositories';

export class ConfirmacionMatriculaController {
  constructor(
    @repository(ConfirmacionRepository)
    public confirmacionRepository: ConfirmacionRepository,
  ) { }

  @get('/confirmacions/{id}/matricula', {
    responses: {
      '200': {
        description: 'Matricula belonging to Confirmacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Matricula)},
          },
        },
      },
    },
  })
  async getMatricula(
    @param.path.string('id') id: typeof Confirmacion.prototype.id,
  ): Promise<Matricula> {
    return this.confirmacionRepository.matricula(id);
  }
}
