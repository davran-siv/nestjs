import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './modules/auth/auth.module'
import { CartModule } from './modules/cart/cart.module'
import { CommentController } from './modules/comment/comment.controller'
import { CommentModule } from './modules/comment/comment.module'
import { CommentService } from './modules/comment/comment.service'
import { ManufacturingMaterialController } from './modules/manufacturing-material/manufacturing-material.controller'
import { ManufacturingMaterialModule } from './modules/manufacturing-material/manufacturing-material.module'
import { ManufacturingMaterialService } from './modules/manufacturing-material/manufacturing-material.service'
import { ProductCategoryModule } from './modules/product-category/product-category.module'
import { ProductReviewModule } from './modules/product-review/product-review.module'
import { ProductModule } from './modules/product/product.module'
import { ShopModule } from './modules/shop/shop.module'
import { UserLocationModule } from './modules/user-location/user-location.module'
import { UserWalletModule } from './modules/user-wallet/user-wallet.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UserModule,
    UserLocationModule,
    ProductModule,
    ProductCategoryModule,
    CartModule,
    CommentModule,
    ManufacturingMaterialModule,
    ProductReviewModule,
    ShopModule,
    UserWalletModule
  ],
  controllers: [],
  providers: []
})
export class ApplicationModule {
}
