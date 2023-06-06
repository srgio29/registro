import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Matricula,
  Carrera,
} from '../models';
import {MatriculaRepository} from '../repositories';

export class MatriculaCarreraController {
  constructor(
    @repository(MatriculaRepository)
    public matriculaRepository: MatriculaRepository,
  ) { }

  @get('/matriculas/{id}/carrera', {
    responses: {
      '200': {
        description: 'Carrera belonging to Matricula',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Carrera)},
          },
        },
      },
    },
  })
  async getCarrera(
    @param.path.string('id') id: typeof Matricula.prototype.id,
  ): Promise<Carrera> {
    return this.matriculaRepository.carrera(id);
  }
}
