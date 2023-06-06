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
  Retiro,
} from '../models';
import {CarreraRepository} from '../repositories';

export class CarreraRetiroController {
  constructor(
    @repository(CarreraRepository) protected carreraRepository: CarreraRepository,
  ) { }

  @get('/carreras/{id}/retiros', {
    responses: {
      '200': {
        description: 'Array of Carrera has many Retiro',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Retiro)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Retiro>,
  ): Promise<Retiro[]> {
    return this.carreraRepository.retiros(id).find(filter);
  }

  @post('/carreras/{id}/retiros', {
    responses: {
      '200': {
        description: 'Carrera model instance',
        content: {'application/json': {schema: getModelSchemaRef(Retiro)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Carrera.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Retiro, {
            title: 'NewRetiroInCarrera',
            exclude: ['id'],
            optional: ['carreraId']
          }),
        },
      },
    }) retiro: Omit<Retiro, 'id'>,
  ): Promise<Retiro> {
    return this.carreraRepository.retiros(id).create(retiro);
  }

  @patch('/carreras/{id}/retiros', {
    responses: {
      '200': {
        description: 'Carrera.Retiro PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Retiro, {partial: true}),
        },
      },
    })
    retiro: Partial<Retiro>,
    @param.query.object('where', getWhereSchemaFor(Retiro)) where?: Where<Retiro>,
  ): Promise<Count> {
    return this.carreraRepository.retiros(id).patch(retiro, where);
  }

  @del('/carreras/{id}/retiros', {
    responses: {
      '200': {
        description: 'Carrera.Retiro DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Retiro)) where?: Where<Retiro>,
  ): Promise<Count> {
    return this.carreraRepository.retiros(id).delete(where);
  }
}
