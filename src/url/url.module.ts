import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { URL } from './url.entity';

@Module({
  imports: [TypeOrmModule.forFeature([URL])],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
