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
  Adicion,
} from '../models';
import {CarreraRepository} from '../repositories';

export class CarreraAdicionController {
  constructor(
    @repository(CarreraRepository) protected carreraRepository: CarreraRepository,
  ) { }

  @get('/carreras/{id}/adicions', {
    responses: {
      '200': {
        description: 'Array of Carrera has many Adicion',
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
    return this.carreraRepository.adicions(id).find(filter);
  }

  @post('/carreras/{id}/adicions', {
    responses: {
      '200': {
        description: 'Carrera model instance',
        content: {'application/json': {schema: getModelSchemaRef(Adicion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Carrera.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Adicion, {
            title: 'NewAdicionInCarrera',
            exclude: ['id'],
            optional: ['carreraId']
          }),
        },
      },
    }) adicion: Omit<Adicion, 'id'>,
  ): Promise<Adicion> {
    return this.carreraRepository.adicions(id).create(adicion);
  }

  @patch('/carreras/{id}/adicions', {
    responses: {
      '200': {
        description: 'Carrera.Adicion PATCH success count',
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
    return this.carreraRepository.adicions(id).patch(adicion, where);
  }

  @del('/carreras/{id}/adicions', {
    responses: {
      '200': {
        description: 'Carrera.Adicion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Adicion)) where?: Where<Adicion>,
  ): Promise<Count> {
    return this.carreraRepository.adicions(id).delete(where);
  }
}
