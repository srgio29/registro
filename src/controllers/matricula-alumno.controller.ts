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
  Alumno,
} from '../models';
import {MatriculaRepository} from '../repositories';

export class MatriculaAlumnoController {
  constructor(
    @repository(MatriculaRepository)
    public matriculaRepository: MatriculaRepository,
  ) { }

  @get('/matriculas/{id}/alumno', {
    responses: {
      '200': {
        description: 'Alumno belonging to Matricula',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Alumno)},
          },
        },
      },
    },
  })
  async getAlumno(
    @param.path.string('id') id: typeof Matricula.prototype.id,
  ): Promise<Alumno> {
    return this.matriculaRepository.alumno(id);
  }
}
