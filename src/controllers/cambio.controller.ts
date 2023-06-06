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
import {Cambio} from '../models';
import {CambioRepository} from '../repositories';

export class CambioController {
  constructor(
    @repository(CambioRepository)
    public cambioRepository : CambioRepository,
  ) {}

  @post('/cambios')
  @response(200, {
    description: 'Cambio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cambio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cambio, {
            title: 'NewCambio',
            exclude: ['id'],
          }),
        },
      },
    })
    cambio: Omit<Cambio, 'id'>,
  ): Promise<Cambio> {
    return this.cambioRepository.create(cambio);
  }

  @get('/cambios/count')
  @response(200, {
    description: 'Cambio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cambio) where?: Where<Cambio>,
  ): Promise<Count> {
    return this.cambioRepository.count(where);
  }

  @get('/cambios')
  @response(200, {
    description: 'Array of Cambio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cambio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cambio) filter?: Filter<Cambio>,
  ): Promise<Cambio[]> {
    return this.cambioRepository.find(filter);
  }

  @patch('/cambios')
  @response(200, {
    description: 'Cambio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cambio, {partial: true}),
        },
      },
    })
    cambio: Cambio,
    @param.where(Cambio) where?: Where<Cambio>,
  ): Promise<Count> {
    return this.cambioRepository.updateAll(cambio, where);
  }

  @get('/cambios/{id}')
  @response(200, {
    description: 'Cambio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cambio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cambio, {exclude: 'where'}) filter?: FilterExcludingWhere<Cambio>
  ): Promise<Cambio> {
    return this.cambioRepository.findById(id, filter);
  }

  @patch('/cambios/{id}')
  @response(204, {
    description: 'Cambio PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cambio, {partial: true}),
        },
      },
    })
    cambio: Cambio,
  ): Promise<void> {
    await this.cambioRepository.updateById(id, cambio);
  }

  @put('/cambios/{id}')
  @response(204, {
    description: 'Cambio PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cambio: Cambio,
  ): Promise<void> {
    await this.cambioRepository.replaceById(id, cambio);
  }

  @del('/cambios/{id}')
  @response(204, {
    description: 'Cambio DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cambioRepository.deleteById(id);
  }
}
