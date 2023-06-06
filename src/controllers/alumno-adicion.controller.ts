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
  Adicion,
} from '../models';
import {AlumnoRepository} from '../repositories';

export class AlumnoAdicionController {
  constructor(
    @repository(AlumnoRepository) protected alumnoRepository: AlumnoRepository,
  ) { }

  @get('/alumnos/{id}/adicions', {
    responses: {
      '200': {
        description: 'Array of Alumno has many Adicion',
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
    return this.alumnoRepository.adicions(id).find(filter);
  }

  @post('/alumnos/{id}/adicions', {
    responses: {
      '200': {
        description: 'Alumno model instance',
        content: {'application/json': {schema: getModelSchemaRef(Adicion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Alumno.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Adicion, {
            title: 'NewAdicionInAlumno',
            exclude: ['id'],
            optional: ['alumnoId']
          }),
        },
      },
    }) adicion: Omit<Adicion, 'id'>,
  ): Promise<Adicion> {
    return this.alumnoRepository.adicions(id).create(adicion);
  }

  @patch('/alumnos/{id}/adicions', {
    responses: {
      '200': {
        description: 'Alumno.Adicion PATCH success count',
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
    return this.alumnoRepository.adicions(id).patch(adicion, where);
  }

  @del('/alumnos/{id}/adicions', {
    responses: {
      '200': {
        description: 'Alumno.Adicion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Adicion)) where?: Where<Adicion>,
  ): Promise<Count> {
    return this.alumnoRepository.adicions(id).delete(where);
  }
}
