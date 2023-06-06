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
  Docente,
  Carrera,
} from '../models';
import {DocenteRepository} from '../repositories';

export class DocenteCarreraController {
  constructor(
    @repository(DocenteRepository) protected docenteRepository: DocenteRepository,
  ) { }

  @get('/docentes/{id}/carreras', {
    responses: {
      '200': {
        description: 'Array of Docente has many Carrera',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Carrera)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Carrera>,
  ): Promise<Carrera[]> {
    return this.docenteRepository.carreras(id).find(filter);
  }

  @post('/docentes/{id}/carreras', {
    responses: {
      '200': {
        description: 'Docente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Carrera)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Docente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Carrera, {
            title: 'NewCarreraInDocente',
            exclude: ['id'],
            optional: ['docenteId']
          }),
        },
      },
    }) carrera: Omit<Carrera, 'id'>,
  ): Promise<Carrera> {
    return this.docenteRepository.carreras(id).create(carrera);
  }

  @patch('/docentes/{id}/carreras', {
    responses: {
      '200': {
        description: 'Docente.Carrera PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Carrera, {partial: true}),
        },
      },
    })
    carrera: Partial<Carrera>,
    @param.query.object('where', getWhereSchemaFor(Carrera)) where?: Where<Carrera>,
  ): Promise<Count> {
    return this.docenteRepository.carreras(id).patch(carrera, where);
  }

  @del('/docentes/{id}/carreras', {
    responses: {
      '200': {
        description: 'Docente.Carrera DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Carrera)) where?: Where<Carrera>,
  ): Promise<Count> {
    return this.docenteRepository.carreras(id).delete(where);
  }
}
