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
  Cambio,
} from '../models';
import {AlumnoRepository} from '../repositories';

export class AlumnoCambioController {
  constructor(
    @repository(AlumnoRepository) protected alumnoRepository: AlumnoRepository,
  ) { }

  @get('/alumnos/{id}/cambios', {
    responses: {
      '200': {
        description: 'Array of Alumno has many Cambio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cambio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cambio>,
  ): Promise<Cambio[]> {
    return this.alumnoRepository.cambios(id).find(filter);
  }

  @post('/alumnos/{id}/cambios', {
    responses: {
      '200': {
        description: 'Alumno model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cambio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Alumno.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cambio, {
            title: 'NewCambioInAlumno',
            exclude: ['id'],
            optional: ['alumnoId']
          }),
        },
      },
    }) cambio: Omit<Cambio, 'id'>,
  ): Promise<Cambio> {
    return this.alumnoRepository.cambios(id).create(cambio);
  }

  @patch('/alumnos/{id}/cambios', {
    responses: {
      '200': {
        description: 'Alumno.Cambio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cambio, {partial: true}),
        },
      },
    })
    cambio: Partial<Cambio>,
    @param.query.object('where', getWhereSchemaFor(Cambio)) where?: Where<Cambio>,
  ): Promise<Count> {
    return this.alumnoRepository.cambios(id).patch(cambio, where);
  }

  @del('/alumnos/{id}/cambios', {
    responses: {
      '200': {
        description: 'Alumno.Cambio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cambio)) where?: Where<Cambio>,
  ): Promise<Count> {
    return this.alumnoRepository.cambios(id).delete(where);
  }
}
