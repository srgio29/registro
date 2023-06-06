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
import {Confirmacion} from '../models';
import {ConfirmacionRepository} from '../repositories';

export class ConfirmacionController {
  constructor(
    @repository(ConfirmacionRepository)
    public confirmacionRepository : ConfirmacionRepository,
  ) {}

  @post('/confirmacions')
  @response(200, {
    description: 'Confirmacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Confirmacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Confirmacion, {
            title: 'NewConfirmacion',
            exclude: ['id'],
          }),
        },
      },
    })
    confirmacion: Omit<Confirmacion, 'id'>,
  ): Promise<Confirmacion> {
    return this.confirmacionRepository.create(confirmacion);
  }

  @get('/confirmacions/count')
  @response(200, {
    description: 'Confirmacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Confirmacion) where?: Where<Confirmacion>,
  ): Promise<Count> {
    return this.confirmacionRepository.count(where);
  }

  @get('/confirmacions')
  @response(200, {
    description: 'Array of Confirmacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Confirmacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Confirmacion) filter?: Filter<Confirmacion>,
  ): Promise<Confirmacion[]> {
    return this.confirmacionRepository.find(filter);
  }

  @patch('/confirmacions')
  @response(200, {
    description: 'Confirmacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Confirmacion, {partial: true}),
        },
      },
    })
    confirmacion: Confirmacion,
    @param.where(Confirmacion) where?: Where<Confirmacion>,
  ): Promise<Count> {
    return this.confirmacionRepository.updateAll(confirmacion, where);
  }

  @get('/confirmacions/{id}')
  @response(200, {
    description: 'Confirmacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Confirmacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Confirmacion, {exclude: 'where'}) filter?: FilterExcludingWhere<Confirmacion>
  ): Promise<Confirmacion> {
    return this.confirmacionRepository.findById(id, filter);
  }

  @patch('/confirmacions/{id}')
  @response(204, {
    description: 'Confirmacion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Confirmacion, {partial: true}),
        },
      },
    })
    confirmacion: Confirmacion,
  ): Promise<void> {
    await this.confirmacionRepository.updateById(id, confirmacion);
  }

  @put('/confirmacions/{id}')
  @response(204, {
    description: 'Confirmacion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() confirmacion: Confirmacion,
  ): Promise<void> {
    await this.confirmacionRepository.replaceById(id, confirmacion);
  }

  @del('/confirmacions/{id}')
  @response(204, {
    description: 'Confirmacion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.confirmacionRepository.deleteById(id);
  }
}
