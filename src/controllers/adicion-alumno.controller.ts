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
  Alumno,
} from '../models';
import {AdicionRepository} from '../repositories';

export class AdicionAlumnoController {
  constructor(
    @repository(AdicionRepository)
    public adicionRepository: AdicionRepository,
  ) { }

  @get('/adicions/{id}/alumno', {
    responses: {
      '200': {
        description: 'Alumno belonging to Adicion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Alumno)},
          },
        },
      },
    },
  })
  async getAlumno(
    @param.path.string('id') id: typeof Adicion.prototype.id,
  ): Promise<Alumno> {
    return this.adicionRepository.alumno(id);
  }
}
