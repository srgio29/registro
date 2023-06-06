import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Carrera,
  Docente,
} from '../models';
import {CarreraRepository} from '../repositories';

export class CarreraDocenteController {
  constructor(
    @repository(CarreraRepository)
    public carreraRepository: CarreraRepository,
  ) { }

  @get('/carreras/{id}/docente', {
    responses: {
      '200': {
        description: 'Docente belonging to Carrera',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Docente)},
          },
        },
      },
    },
  })
  async getDocente(
    @param.path.string('id') id: typeof Carrera.prototype.id,
  ): Promise<Docente> {
    return this.carreraRepository.docente(id);
  }
}
