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
import {Retiro} from '../models';
import {RetiroRepository} from '../repositories';

export class RetiroController {
  constructor(
    @repository(RetiroRepository)
    public retiroRepository : RetiroRepository,
  ) {}

  @post('/retiros')
  @response(200, {
    description: 'Retiro model instance',
    content: {'application/json': {schema: getModelSchemaRef(Retiro)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Retiro, {
            title: 'NewRetiro',
            exclude: ['id'],
          }),
        },
      },
    })
    retiro: Omit<Retiro, 'id'>,
  ): Promise<Retiro> {
    return this.retiroRepository.create(retiro);
  }

  @get('/retiros/count')
  @response(200, {
    description: 'Retiro model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Retiro) where?: Where<Retiro>,
  ): Promise<Count> {
    return this.retiroRepository.count(where);
  }

  @get('/retiros')
  @response(200, {
    description: 'Array of Retiro model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Retiro, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Retiro) filter?: Filter<Retiro>,
  ): Promise<Retiro[]> {
    return this.retiroRepository.find(filter);
  }

  @patch('/retiros')
  @response(200, {
    description: 'Retiro PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Retiro, {partial: true}),
        },
      },
    })
    retiro: Retiro,
    @param.where(Retiro) where?: Where<Retiro>,
  ): Promise<Count> {
    return this.retiroRepository.updateAll(retiro, where);
  }

  @get('/retiros/{id}')
  @response(200, {
    description: 'Retiro model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Retiro, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Retiro, {exclude: 'where'}) filter?: FilterExcludingWhere<Retiro>
  ): Promise<Retiro> {
    return this.retiroRepository.findById(id, filter);
  }

  @patch('/retiros/{id}')
  @response(204, {
    description: 'Retiro PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Retiro, {partial: true}),
        },
      },
    })
    retiro: Retiro,
  ): Promise<void> {
    await this.retiroRepository.updateById(id, retiro);
  }

  @put('/retiros/{id}')
  @response(204, {
    description: 'Retiro PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() retiro: Retiro,
  ): Promise<void> {
    await this.retiroRepository.replaceById(id, retiro);
  }

  @del('/retiros/{id}')
  @response(204, {
    description: 'Retiro DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.retiroRepository.deleteById(id);
  }
}
