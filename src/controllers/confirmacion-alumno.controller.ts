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
  Alumno,
} from '../models';
import {ConfirmacionRepository} from '../repositories';

export class ConfirmacionAlumnoController {
  constructor(
    @repository(ConfirmacionRepository)
    public confirmacionRepository: ConfirmacionRepository,
  ) { }

  @get('/confirmacions/{id}/alumno', {
    responses: {
      '200': {
        description: 'Alumno belonging to Confirmacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Alumno)},
          },
        },
      },
    },
  })
  async getAlumno(
    @param.path.string('id') id: typeof Confirmacion.prototype.id,
  ): Promise<Alumno> {
    return this.confirmacionRepository.alumno(id);
  }
}
