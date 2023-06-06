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
  Adicion,
} from '../models';
import {ConfirmacionRepository} from '../repositories';

export class ConfirmacionAdicionController {
  constructor(
    @repository(ConfirmacionRepository) protected confirmacionRepository: ConfirmacionRepository,
  ) { }

  @get('/confirmacions/{id}/adicions', {
    responses: {
      '200': {
        description: 'Array of Confirmacion has many Adicion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Adicion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Adicion>,
  ): Promise<Adicion[]> {
    return this.confirmacionRepository.adicions(id).find(filter);
  }

  @post('/confirmacions/{id}/adicions', {
    responses: {
      '200': {
        description: 'Confirmacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Adicion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Confirmacion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Adicion, {
            title: 'NewAdicionInConfirmacion',
            exclude: ['id'],
            optional: ['confirmacionId']
          }),
        },
      },
    }) adicion: Omit<Adicion, 'id'>,
  ): Promise<Adicion> {
    return this.confirmacionRepository.adicions(id).create(adicion);
  }

  @patch('/confirmacions/{id}/adicions', {
    responses: {
      '200': {
        description: 'Confirmacion.Adicion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Adicion, {partial: true}),
        },
      },
    })
    adicion: Partial<Adicion>,
    @param.query.object('where', getWhereSchemaFor(Adicion)) where?: Where<Adicion>,
  ): Promise<Count> {
    return this.confirmacionRepository.adicions(id).patch(adicion, where);
  }

  @del('/confirmacions/{id}/adicions', {
    responses: {
      '200': {
        description: 'Confirmacion.Adicion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Adicion)) where?: Where<Adicion>,
  ): Promise<Count> {
    return this.confirmacionRepository.adicions(id).delete(where);
  }
}
