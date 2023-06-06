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
  Alumno,
} from '../models';
import {RetiroRepository} from '../repositories';

export class RetiroAlumnoController {
  constructor(
    @repository(RetiroRepository)
    public retiroRepository: RetiroRepository,
  ) { }

  @get('/retiros/{id}/alumno', {
    responses: {
      '200': {
        description: 'Alumno belonging to Retiro',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Alumno)},
          },
        },
      },
    },
  })
  async getAlumno(
    @param.path.string('id') id: typeof Retiro.prototype.id,
  ): Promise<Alumno> {
    return this.retiroRepository.alumno(id);
  }
}
