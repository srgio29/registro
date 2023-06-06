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
  Confirmacion,
  Cambio,
} from '../models';
import {ConfirmacionRepository} from '../repositories';

export class ConfirmacionCambioController {
  constructor(
    @repository(ConfirmacionRepository) protected confirmacionRepository: ConfirmacionRepository,
  ) { }

  @get('/confirmacions/{id}/cambios', {
    responses: {
      '200': {
        description: 'Array of Confirmacion has many Cambio',
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
    return this.confirmacionRepository.cambios(id).find(filter);
  }

  @post('/confirmacions/{id}/cambios', {
    responses: {
      '200': {
        description: 'Confirmacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cambio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Confirmacion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cambio, {
            title: 'NewCambioInConfirmacion',
            exclude: ['id'],
            optional: ['confirmacionId']
          }),
        },
      },
    }) cambio: Omit<Cambio, 'id'>,
  ): Promise<Cambio> {
    return this.confirmacionRepository.cambios(id).create(cambio);
  }

  @patch('/confirmacions/{id}/cambios', {
    responses: {
      '200': {
        description: 'Confirmacion.Cambio PATCH success count',
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
    return this.confirmacionRepository.cambios(id).patch(cambio, where);
  }

  @del('/confirmacions/{id}/cambios', {
    responses: {
      '200': {
        description: 'Confirmacion.Cambio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cambio)) where?: Where<Cambio>,
  ): Promise<Count> {
    return this.confirmacionRepository.cambios(id).delete(where);
  }
}
