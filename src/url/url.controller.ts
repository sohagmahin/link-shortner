import { Body, Controller, Get, Param, Post, Response } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from 'src/Dtos/create-url.dto';
// import { RedirectInterceptor } from 'src/interceptor/redirect.interceptor';

@Controller('url')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Get('/:key')
  //   @UseInterceptors(RedirectInterceptor)
  async getUrl(@Param('key') key, @Response() res) {
    const url = await this.urlService.getUrl(key);
    console.log(url);
    return res.redirect(url);
  }

  @Post('/')
  postUrl(@Body() body: CreateUrlDto): Promise<string> {
    return this.urlService.postUrl(body.url);
  }
}
