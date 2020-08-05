// import {Delete, Get, Inject, Post, Put, Response, Type} from '@nestjs/common'
// import {ItemsWithCount} from '../generics/items-with-count.generic'
//
// interface BaseController {
//   service: BaseService
//   CreateDto: Type<any>
//   UpdateDto: Type<any>
//   ResponseDto: Type<any>
// }
//
// interface BaseService<Create = any, Update = any, Response = any> {
//   createOne(dto: Create): Response
//
//   updateOne(dto: Update): Response
//
//   deleteOne(id: string): void
//
//   findOne(id: string): Response
//
//   getAll(): ItemsWithCount<Response>
// }
//
// export const BasesController = (data: BaseController) => {
//   class someController {
//     @Inject(data.service) private readonly service: BaseService
//
//     @Post()
//     async createOne(dto: Type<any>): Promise<any> {
//
//     }
//
//     @Put(':id')
//     async updateOne(dto: Type<any>): Promise<any> {
//
//     }
//
//     @Delete(':id')
//     async deleteOne(): Promise<void> {
//
//     }
//
//     @Get(':id')
//     async findOne(): Promise<any> {
//
//     }
//
//     @Get()
//     async getAll(): Promise<any> {
//
//     }
//   }
//
//   return someController
// }
