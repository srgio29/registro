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
  Confirmacion,
} from '../models';
import {CarreraRepository} from '../repositories';

export class CarreraConfirmacionController {
  constructor(
    @repository(CarreraRepository) protected carreraRepository: CarreraRepository,
  ) { }

  @get('/carreras/{id}/confirmacions', {
    responses: {
      '200': {
        description: 'Array of Carrera has many Confirmacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Confirmacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Confirmacion>,
  ): Promise<Confirmacion[]> {
    return this.carreraRepository.confirmacions(id).find(filter);
  }

  @post('/carreras/{id}/confirmacions', {
    responses: {
      '200': {
        description: 'Carrera model instance',
        content: {'application/json': {schema: getModelSchemaRef(Confirmacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Carrera.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Confirmacion, {
            title: 'NewConfirmacionInCarrera',
            exclude: ['id'],
            optional: ['carreraId']
          }),
        },
      },
    }) confirmacion: Omit<Confirmacion, 'id'>,
  ): Promise<Confirmacion> {
    return this.carreraRepository.confirmacions(id).create(confirmacion);
  }

  @patch('/carreras/{id}/confirmacions', {
    responses: {
      '200': {
        description: 'Carrera.Confirmacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Confirmacion, {partial: true}),
        },
      },
    })
    confirmacion: Partial<Confirmacion>,
    @param.query.object('where', getWhereSchemaFor(Confirmacion)) where?: Where<Confirmacion>,
  ): Promise<Count> {
    return this.carreraRepository.confirmacions(id).patch(confirmacion, where);
  }

  @del('/carreras/{id}/confirmacions', {
    responses: {
      '200': {
        description: 'Carrera.Confirmacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Confirmacion)) where?: Where<Confirmacion>,
  ): Promise<Count> {
    return this.carreraRepository.confirmacions(id).delete(where);
  }
}
