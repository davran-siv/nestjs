import {Delete, Get, Inject, Post, Put, Type} from '@nestjs/common'
import {ItemsWithCount} from '../generics/items-with-count.generic'

interface BaseController {
  service: BaseService
  CreateDto: Type<any>
  UpdateDto: Type<any>
  ResponseDto: Type<any>
}

interface BaseService<Create = any, Update = any, Response = any> {
  createOne(dto: Create): Response

  updateOne(dto: Update): Response

  deleteOne(id: string): void

  findOne(id: string): Response

  getAll(): ItemsWithCount<Response>
}

export const BaseController = ({ service, CreateDto, UpdateDto, ResponseDto }: BaseController) => {
  class Controller {
    @Inject(service) private readonly service: BaseService

    @Post()
    async createOne(dto: CreateDto): Promise<UpdateDto> {

    }

    @Put(':id')
    async updateOne() {

    }

    @Delete(':id')
    async deleteOne() {

    }

    @Get(':id')
    async findOne() {

    }

    @Get()
    async getAll() {

    }
  }

  return Controller
}
