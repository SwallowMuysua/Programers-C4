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
import {Credencial} from '../models';
import {CredencialRepository} from '../repositories';

export class CredencialController {
  constructor(
    @repository(CredencialRepository)
    public credencialRepository : CredencialRepository,
  ) {}

  @post('/credenciales')
  @response(200, {
    description: 'Credencial model instance',
    content: {'application/json': {schema: getModelSchemaRef(Credencial)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credencial, {
            title: 'NewCredencial',
            exclude: ['id'],
          }),
        },
      },
    })
    credencial: Omit<Credencial, 'id'>,
  ): Promise<Credencial> {
    return this.credencialRepository.create(credencial);
  }

  @get('/credenciales/count')
  @response(200, {
    description: 'Credencial model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Credencial) where?: Where<Credencial>,
  ): Promise<Count> {
    return this.credencialRepository.count(where);
  }

  @get('/credenciales')
  @response(200, {
    description: 'Array of Credencial model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Credencial, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Credencial) filter?: Filter<Credencial>,
  ): Promise<Credencial[]> {
    return this.credencialRepository.find(filter);
  }

  @patch('/credenciales')
  @response(200, {
    description: 'Credencial PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credencial, {partial: true}),
        },
      },
    })
    credencial: Credencial,
    @param.where(Credencial) where?: Where<Credencial>,
  ): Promise<Count> {
    return this.credencialRepository.updateAll(credencial, where);
  }

  @get('/credenciales/{id}')
  @response(200, {
    description: 'Credencial model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Credencial, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Credencial, {exclude: 'where'}) filter?: FilterExcludingWhere<Credencial>
  ): Promise<Credencial> {
    return this.credencialRepository.findById(id, filter);
  }

  @patch('/credenciales/{id}')
  @response(204, {
    description: 'Credencial PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credencial, {partial: true}),
        },
      },
    })
    credencial: Credencial,
  ): Promise<void> {
    await this.credencialRepository.updateById(id, credencial);
  }

  @put('/credenciales/{id}')
  @response(204, {
    description: 'Credencial PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() credencial: Credencial,
  ): Promise<void> {
    await this.credencialRepository.replaceById(id, credencial);
  }

  @del('/credenciales/{id}')
  @response(204, {
    description: 'Credencial DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.credencialRepository.deleteById(id);
  }
}