import { forwardRef, Module } from '@nestjs/common';
import { KeycloakService } from '../services';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository } from '../repositories';
import { AuthenticationService } from '../services';
import { CloudinaryService } from '../services';
import { AccountsModule } from './accounts.module';
import { AuthenticationController } from '../controllers';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => AccountsModule),
    TypeOrmModule.forFeature([AccountRepository]),
  ],
  controllers: [AuthenticationController],
  providers: [KeycloakService, AuthenticationService, CloudinaryService],
  exports: [KeycloakService],
})
export class KeycloakModule {}
