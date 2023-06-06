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
  Confirmacion,
} from '../models';
import {AlumnoRepository} from '../repositories';

export class AlumnoConfirmacionController {
  constructor(
    @repository(AlumnoRepository) protected alumnoRepository: AlumnoRepository,
  ) { }

  @get('/alumnos/{id}/confirmacions', {
    responses: {
      '200': {
        description: 'Array of Alumno has many Confirmacion',
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
    return this.alumnoRepository.confirmacions(id).find(filter);
  }

  @post('/alumnos/{id}/confirmacions', {
    responses: {
      '200': {
        description: 'Alumno model instance',
        content: {'application/json': {schema: getModelSchemaRef(Confirmacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Alumno.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Confirmacion, {
            title: 'NewConfirmacionInAlumno',
            exclude: ['id'],
            optional: ['alumnoId']
          }),
        },
      },
    }) confirmacion: Omit<Confirmacion, 'id'>,
  ): Promise<Confirmacion> {
    return this.alumnoRepository.confirmacions(id).create(confirmacion);
  }

  @patch('/alumnos/{id}/confirmacions', {
    responses: {
      '200': {
        description: 'Alumno.Confirmacion PATCH success count',
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
    return this.alumnoRepository.confirmacions(id).patch(confirmacion, where);
  }

  @del('/alumnos/{id}/confirmacions', {
    responses: {
      '200': {
        description: 'Alumno.Confirmacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Confirmacion)) where?: Where<Confirmacion>,
  ): Promise<Count> {
    return this.alumnoRepository.confirmacions(id).delete(where);
  }
}
