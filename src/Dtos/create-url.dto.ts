import { IsUrl } from 'class-validator';

export class CreateUrlDto {
  // this is required

  @IsUrl()
  url: string;
}
