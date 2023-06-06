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
  Matricula,
  Confirmacion,
} from '../models';
import {MatriculaRepository} from '../repositories';

export class MatriculaConfirmacionController {
  constructor(
    @repository(MatriculaRepository) protected matriculaRepository: MatriculaRepository,
  ) { }

  @get('/matriculas/{id}/confirmacions', {
    responses: {
      '200': {
        description: 'Array of Matricula has many Confirmacion',
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
    return this.matriculaRepository.confirmacions(id).find(filter);
  }

  @post('/matriculas/{id}/confirmacions', {
    responses: {
      '200': {
        description: 'Matricula model instance',
        content: {'application/json': {schema: getModelSchemaRef(Confirmacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Matricula.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Confirmacion, {
            title: 'NewConfirmacionInMatricula',
            exclude: ['id'],
            optional: ['matriculaId']
          }),
        },
      },
    }) confirmacion: Omit<Confirmacion, 'id'>,
  ): Promise<Confirmacion> {
    return this.matriculaRepository.confirmacions(id).create(confirmacion);
  }

  @patch('/matriculas/{id}/confirmacions', {
    responses: {
      '200': {
        description: 'Matricula.Confirmacion PATCH success count',
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
    return this.matriculaRepository.confirmacions(id).patch(confirmacion, where);
  }

  @del('/matriculas/{id}/confirmacions', {
    responses: {
      '200': {
        description: 'Matricula.Confirmacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Confirmacion)) where?: Where<Confirmacion>,
  ): Promise<Count> {
    return this.matriculaRepository.confirmacions(id).delete(where);
  }
}
