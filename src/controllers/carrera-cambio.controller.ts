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
  Cambio,
} from '../models';
import {CarreraRepository} from '../repositories';

export class CarreraCambioController {
  constructor(
    @repository(CarreraRepository) protected carreraRepository: CarreraRepository,
  ) { }

  @get('/carreras/{id}/cambios', {
    responses: {
      '200': {
        description: 'Array of Carrera has many Cambio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cambio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cambio>,
  ): Promise<Cambio[]> {
    return this.carreraRepository.cambios(id).find(filter);
  }

  @post('/carreras/{id}/cambios', {
    responses: {
      '200': {
        description: 'Carrera model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cambio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Carrera.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cambio, {
            title: 'NewCambioInCarrera',
            exclude: ['id'],
            optional: ['carreraId']
          }),
        },
      },
    }) cambio: Omit<Cambio, 'id'>,
  ): Promise<Cambio> {
    return this.carreraRepository.cambios(id).create(cambio);
  }

  @patch('/carreras/{id}/cambios', {
    responses: {
      '200': {
        description: 'Carrera.Cambio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cambio, {partial: true}),
        },
      },
    })
    cambio: Partial<Cambio>,
    @param.query.object('where', getWhereSchemaFor(Cambio)) where?: Where<Cambio>,
  ): Promise<Count> {
    return this.carreraRepository.cambios(id).patch(cambio, where);
  }

  @del('/carreras/{id}/cambios', {
    responses: {
      '200': {
        description: 'Carrera.Cambio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cambio)) where?: Where<Cambio>,
  ): Promise<Count> {
    return this.carreraRepository.cambios(id).delete(where);
  }
}
