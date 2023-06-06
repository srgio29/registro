import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Adicion} from '../models';
import {AdicionRepository} from '../repositories';

export class AdicionController {
  constructor(
    @repository(AdicionRepository)
    public adicionRepository : AdicionRepository,
  ) {}

  @post('/adicions')
  @response(200, {
    description: 'Adicion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Adicion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Adicion, {
            title: 'NewAdicion',
            exclude: ['id'],
          }),
        },
      },
    })
    adicion: Omit<Adicion, 'id'>,
  ): Promise<Adicion> {
    return this.adicionRepository.create(adicion);
  }

  @get('/adicions/count')
  @response(200, {
    description: 'Adicion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Adicion) where?: Where<Adicion>,
  ): Promise<Count> {
    return this.adicionRepository.count(where);
  }

  @get('/adicions')
  @response(200, {
    description: 'Array of Adicion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Adicion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Adicion) filter?: Filter<Adicion>,
  ): Promise<Adicion[]> {
    return this.adicionRepository.find(filter);
  }

  @patch('/adicions')
  @response(200, {
    description: 'Adicion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Adicion, {partial: true}),
        },
      },
    })
    adicion: Adicion,
    @param.where(Adicion) where?: Where<Adicion>,
  ): Promise<Count> {
    return this.adicionRepository.updateAll(adicion, where);
  }

  @get('/adicions/{id}')
  @response(200, {
    description: 'Adicion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Adicion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Adicion, {exclude: 'where'}) filter?: FilterExcludingWhere<Adicion>
  ): Promise<Adicion> {
    return this.adicionRepository.findById(id, filter);
  }

  @patch('/adicions/{id}')
  @response(204, {
    description: 'Adicion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Adicion, {partial: true}),
        },
      },
    })
    adicion: Adicion,
  ): Promise<void> {
    await this.adicionRepository.updateById(id, adicion);
  }

  @put('/adicions/{id}')
  @response(204, {
    description: 'Adicion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() adicion: Adicion,
  ): Promise<void> {
    await this.adicionRepository.replaceById(id, adicion);
  }

  @del('/adicions/{id}')
  @response(204, {
    description: 'Adicion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.adicionRepository.deleteById(id);
  }
}
