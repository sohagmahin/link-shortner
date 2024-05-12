import { Injectable, NotFoundException } from '@nestjs/common';
import { customAlphabet } from 'nanoid';
import { URL } from './url.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UrlService {
  constructor(@InjectRepository(URL) private repo: Repository<URL>) {}
  async getUrl(key: string): Promise<string> {
    if (!key) {
      return null;
    }
    try {
      // find the URL in the database
      const url = await this.repo.findOneBy({ id: key });
      if (url) {
        return url.url;
      } else {
        throw new NotFoundException('URL not found');
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  postUrl(url: string): Promise<string> {
    // generate a short URL Key
    // [nanoid] (https://www.npmjs.com/package/nanoid)
    const nanoid = customAlphabet('abcdef1234567890', 6);
    const shortKey = nanoid();
    console.log(shortKey);

    try {
      // store the short URL in the database
      const newUrl = this.repo.create({
        id: shortKey,
        url: url,
      });
      return this.repo.save(newUrl).then((res) => {
        return res.id;
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
