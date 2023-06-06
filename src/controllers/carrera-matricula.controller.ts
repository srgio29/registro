import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Carrera,
  Matricula,
} from '../models';
import {CarreraRepository} from '../repositories';

export class CarreraMatriculaController {
  constructor(
    @repository(CarreraRepository) protected carreraRepository: CarreraRepository,
  ) { }

  @get('/carreras/{id}/matriculas', {
    responses: {
      '200': {
        description: 'Array of Carrera has many Matricula',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Matricula)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Matricula>,
  ): Promise<Matricula[]> {
    return this.carreraRepository.matriculas(id).find(filter);
  }

  @post('/carreras/{id}/matriculas', {
    responses: {
      '200': {
        description: 'Carrera model instance',
        content: {'application/json': {schema: getModelSchemaRef(Matricula)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Carrera.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Matricula, {
            title: 'NewMatriculaInCarrera',
            exclude: ['id'],
            optional: ['carreraId']
          }),
        },
      },
    }) matricula: Omit<Matricula, 'id'>,
  ): Promise<Matricula> {
    return this.carreraRepository.matriculas(id).create(matricula);
  }

  @patch('/carreras/{id}/matriculas', {
    responses: {
      '200': {
        description: 'Carrera.Matricula PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Matricula, {partial: true}),
        },
      },
    })
    matricula: Partial<Matricula>,
    @param.query.object('where', getWhereSchemaFor(Matricula)) where?: Where<Matricula>,
  ): Promise<Count> {
    return this.carreraRepository.matriculas(id).patch(matricula, where);
  }

  @del('/carreras/{id}/matriculas', {
    responses: {
      '200': {
        description: 'Carrera.Matricula DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Matricula)) where?: Where<Matricula>,
  ): Promise<Count> {
    return this.carreraRepository.matriculas(id).delete(where);
  }
}
