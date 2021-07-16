import { Controller, Get, Res, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/fileTest')
  async getFileTest(@Res() response): Promise<StreamableFile> {
    const dynmaicFileName = `test_${Date.now()}.json`;
    response.header(
      'Content-Disposition',
      `attachment;filename=${dynmaicFileName}`,
    );

    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }
}
