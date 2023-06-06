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
  Matricula,
} from '../models';
import {AlumnoRepository} from '../repositories';

export class AlumnoMatriculaController {
  constructor(
    @repository(AlumnoRepository) protected alumnoRepository: AlumnoRepository,
  ) { }

  @get('/alumnos/{id}/matriculas', {
    responses: {
      '200': {
        description: 'Array of Alumno has many Matricula',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Matricula)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Matricula>,
  ): Promise<Matricula[]> {
    return this.alumnoRepository.matriculas(id).find(filter);
  }

  @post('/alumnos/{id}/matriculas', {
    responses: {
      '200': {
        description: 'Alumno model instance',
        content: {'application/json': {schema: getModelSchemaRef(Matricula)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Alumno.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Matricula, {
            title: 'NewMatriculaInAlumno',
            exclude: ['id'],
            optional: ['alumnoId']
          }),
        },
      },
    }) matricula: Omit<Matricula, 'id'>,
  ): Promise<Matricula> {
    return this.alumnoRepository.matriculas(id).create(matricula);
  }

  @patch('/alumnos/{id}/matriculas', {
    responses: {
      '200': {
        description: 'Alumno.Matricula PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Matricula, {partial: true}),
        },
      },
    })
    matricula: Partial<Matricula>,
    @param.query.object('where', getWhereSchemaFor(Matricula)) where?: Where<Matricula>,
  ): Promise<Count> {
    return this.alumnoRepository.matriculas(id).patch(matricula, where);
  }

  @del('/alumnos/{id}/matriculas', {
    responses: {
      '200': {
        description: 'Alumno.Matricula DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Matricula)) where?: Where<Matricula>,
  ): Promise<Count> {
    return this.alumnoRepository.matriculas(id).delete(where);
  }
}
