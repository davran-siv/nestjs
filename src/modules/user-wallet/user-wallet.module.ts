import { Module } from '@nestjs/common';
import { UserWalletController } from './user-wallet.controller';
import { UserWalletService } from './user-wallet.service';

@Module({
  controllers: [UserWalletController],
  providers: [UserWalletService]
})
export class UserWalletModule {}
