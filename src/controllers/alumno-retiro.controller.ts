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
  Alumno,
  Retiro,
} from '../models';
import {AlumnoRepository} from '../repositories';

export class AlumnoRetiroController {
  constructor(
    @repository(AlumnoRepository) protected alumnoRepository: AlumnoRepository,
  ) { }

  @get('/alumnos/{id}/retiros', {
    responses: {
      '200': {
        description: 'Array of Alumno has many Retiro',
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
    return this.alumnoRepository.retiros(id).find(filter);
  }

  @post('/alumnos/{id}/retiros', {
    responses: {
      '200': {
        description: 'Alumno model instance',
        content: {'application/json': {schema: getModelSchemaRef(Retiro)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Alumno.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Retiro, {
            title: 'NewRetiroInAlumno',
            exclude: ['id'],
            optional: ['alumnoId']
          }),
        },
      },
    }) retiro: Omit<Retiro, 'id'>,
  ): Promise<Retiro> {
    return this.alumnoRepository.retiros(id).create(retiro);
  }

  @patch('/alumnos/{id}/retiros', {
    responses: {
      '200': {
        description: 'Alumno.Retiro PATCH success count',
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
    return this.alumnoRepository.retiros(id).patch(retiro, where);
  }

  @del('/alumnos/{id}/retiros', {
    responses: {
      '200': {
        description: 'Alumno.Retiro DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Retiro)) where?: Where<Retiro>,
  ): Promise<Count> {
    return this.alumnoRepository.retiros(id).delete(where);
  }
}
