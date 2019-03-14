import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './modules/auth/auth.module'
import { ProductCategoryModule } from './modules/product-category/product-category.module'
import { ProductModule } from './modules/product/product.module'
import { UserLocationModule } from './modules/user-location/user-location.module'
import { UserModule } from './modules/user/user.module'
import { CartModule } from './cart/cart.module';
import { CartModule } from './module/cart/cart.module';
import { CartModule } from './modules/cart/cart.module';

@Module({
  imports: [AuthModule, UserModule, TypeOrmModule.forRoot(), UserLocationModule, ProductModule, ProductCategoryModule, CartModule]
})
export class ApplicationModule {
}
