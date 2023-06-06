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
  Retiro,
} from '../models';
import {ConfirmacionRepository} from '../repositories';

export class ConfirmacionRetiroController {
  constructor(
    @repository(ConfirmacionRepository) protected confirmacionRepository: ConfirmacionRepository,
  ) { }

  @get('/confirmacions/{id}/retiros', {
    responses: {
      '200': {
        description: 'Array of Confirmacion has many Retiro',
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
    return this.confirmacionRepository.retiros(id).find(filter);
  }

  @post('/confirmacions/{id}/retiros', {
    responses: {
      '200': {
        description: 'Confirmacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Retiro)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Confirmacion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Retiro, {
            title: 'NewRetiroInConfirmacion',
            exclude: ['id'],
            optional: ['confirmacionId']
          }),
        },
      },
    }) retiro: Omit<Retiro, 'id'>,
  ): Promise<Retiro> {
    return this.confirmacionRepository.retiros(id).create(retiro);
  }

  @patch('/confirmacions/{id}/retiros', {
    responses: {
      '200': {
        description: 'Confirmacion.Retiro PATCH success count',
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
    return this.confirmacionRepository.retiros(id).patch(retiro, where);
  }

  @del('/confirmacions/{id}/retiros', {
    responses: {
      '200': {
        description: 'Confirmacion.Retiro DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Retiro)) where?: Where<Retiro>,
  ): Promise<Count> {
    return this.confirmacionRepository.retiros(id).delete(where);
  }
}
